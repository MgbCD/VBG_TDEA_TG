const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'ticket-service',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const sendMessage = async (ticketData, topic) => {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(ticketData) }],
  });
  await producer.disconnect();
};

module.exports = { sendMessage };
