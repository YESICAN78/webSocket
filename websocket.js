const webSocket = require("ws");

const ws = new webSocket.Server({
  port: 8000,
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
  for (let key in clients) {
    clients[key].send(`用户：${client.name}-${msg}`);
  }
}
