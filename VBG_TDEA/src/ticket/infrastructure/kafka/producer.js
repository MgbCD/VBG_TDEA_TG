const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'ticket-service',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const sendMessage = async (ticketData) => {
  await producer.connect();
  await producer.send({
    topic: 'ticket-created',
    messages: [{ value: JSON.stringify(ticketData) }],
  });
  await producer.disconnect();
};

module.exports = { sendMessage };
