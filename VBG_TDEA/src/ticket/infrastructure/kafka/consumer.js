const { Kafka } = require('kafkajs');
const nodemailer = require('nodemailer');

const kafka = new Kafka({
  clientId: 'email-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'ticket-email-group' });

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,                     
  secure: false,                 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

const sendEmail = async (newTicket) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Nuevo ticket creado - ID ${newTicket._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; margin: 20px;">
        <h2 style="color: #333;">Nuevo ticket creado</h2>
        <p style="color: #555;">Se ha creado un nuevo ticket con los siguientes detalles:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Título:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${newTicket.title}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Descripción:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${newTicket.description}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Creado por:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${newTicket.createdBy}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Fecha de creación:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date(newTicket.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Estado:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${newTicket.statusId}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #555;">Gracias por utilizar nuestro servicio.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

let isRunning = false;

const run = async () => {
  if (isRunning) return;
  isRunning = true;

  await consumer.connect();
  await consumer.subscribe({ topic: 'ticket-created', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const newTicket = JSON.parse(message.value.toString());
      console.log('Nuevo ticket recibido:', newTicket);
      await sendEmail(newTicket);
    },
  });
};

run().catch(console.error);

module.exports = { run };
