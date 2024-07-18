const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new Consumer(
  client,
  [{ topic: "stock-price", partition: 0 }],
  { autoCommit: true }
);

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("Client connected");
  consumer.on("message", (message) => {
    console.log("Received stock price:", message.value);
    socket.emit("stockPrice", message.value);
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
