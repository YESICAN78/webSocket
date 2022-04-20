let { username } = JSON.parse(sessionStorage.getItem("websocketUserId"));
const ws = new WebSocket(`ws://localhost:8000/${username}`); //连接到客户端
//上线
ws.onopen = () => {
  ws.send("我上线啦");
};
//发送信息
ws.onmessage = (msg) => {
  const content = document.getElementById("content");
  content.innerHTML += msg.data + "<br>";
};
//报错
ws.onerror = (err) => {
  console.log(err);
};

//下线
ws.onclose = () => {
  console.log("close");
};
