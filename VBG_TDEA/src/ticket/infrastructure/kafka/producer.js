const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'ticket-service',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const disconnectProducer = async () => {
  await producer.disconnect();
};

const sendMessage = async (ticketData, topic) => {
  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(ticketData) }],
  });
};

module.exports = { sendMessage, connectProducer, disconnectProducer };
