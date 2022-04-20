const express = require("express");
const path = require("path");
const port = 3000;
const host = "localhost";
const app = express();
app.use(express.static(path.resolve(__dirname, "./")));
app.listen(port, host, () => {
  console.log(`客户端服务器为:http://${host}:${port}`);
}); 
