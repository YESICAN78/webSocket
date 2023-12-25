/*
 * @Author: sunFulin
 * @Date: 2022-11-23 11:03:07
 * @LastEditTime: 2023-03-08 09:52:16
 */
const webSocket = require("ws");

const ws = new webSocket.Server({
  port: 21004,
});
// 记录聊天人数
let clients = {};
ws.on("connection", (client, req) => {
  let id = req.url.split("/")[1];
  client.name = id;
  clients[client.name] = client;
  // 用户的聊天信息
  client.on("message", (msg) => {
    console.log("用户" + client.name + "说:" + msg);
    //广播数据发送输出
    broadcast(client, msg);
  });
  // 报错信息
  client.on("error", (err) => {
    if (err) {
      console.log(err);
    }
  });

  // 下线
  client.on("close", () => {
    delete clients[client.name];
    console.log("用户" + client.name + "下线了~~");
  });
});

function broadcast(client, msg) {
  const data = {
    matchUser: {
      name: "孙富林",
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.doubanio.com%2Fview%2Fphoto%2Fsqs%2Fpublic%2Fp2677102402.jpg&refer=http%3A%2F%2Fimg2.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668238794&t=5f11a29dc05001b8200eabfe5329fa53",
    },
    unionId: "064104183126645741",
    msgType: "1",
    scoreForMyself: {
      thisScore: 15,
      totalScore: 0,
    },
    scoreForOther: {
      thisScore: 15,
      totalScore: 0,
    },
    problemList: [
      {
        problemName: "亚运会时间是______。",
        problemType: "77777",
        correctAnswer: "D",
        A: "2019",
        B: "2020",
        C: "2022",
        D: "2023",
      },
      {
        problemName: "按照志愿者的基本站姿要领，以下不正确的是______。",
        problemType: "888",
        correctAnswer: "B",
        A: "收腹挺胸，提臀立腰",
        B: "背对服务对象站立",
        C: "男性与女性通常根据各自不同的性别特点，站姿可以各有一些局部的变化",
        D: "肩平下沉，头正颈直",
      },
      {
        problemName:
          "2019年3月5日，亚奥理事会决定除亚洲地区参赛国家外，正式邀请____参加2022年杭州亚运会。",
        problemType: "9999",
        correctAnswer: "B",
        A: "欧洲国家",
        B: "大洋州国家",
        C: "美洲国家",
        D: "非洲国家",
      },
      {
        problemName: "中华人民共和国成立于____",
        problemType: "9999",
        correctAnswer: "A",
        A: "1949",
        B: "1948",
        C: "1878",
        D: "1908",
      },
    ],
  };
  let reqData = JSON.parse(msg);
  data.scoreForMyself.totalScore = reqData.score;
  data.scoreForOther.totalScore = reqData.score;
  for (let key in clients) {
    // clients[key].send(`用户：${client.name}-${msg}`);
    clients[key].send(JSON.stringify(data));
  }
}
