const kafka = require("kafka-node");
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new Producer(client);
const topic = "stock-price";

producer.on("ready", function () {
  console.log("Producer is ready");
  setInterval(sendMessage, 5000);
});

producer.on("error", function (err) {
  console.error("Producer error:", err);
});

function sendMessage() {
  const price = (Math.random() * 100 + 100).toFixed(2); // Random price between $100 and $200
  const payloads = [{ topic: topic, messages: price }];

  producer.send(payloads, function (err, data) {
    if (err) {
      console.error("Producer send error:", err);
    } else {
      console.log("Sent price:", price);
    }
  });
}
