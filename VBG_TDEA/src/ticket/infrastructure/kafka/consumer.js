const { Kafka } = require('kafkajs');
const nodemailer = require('nodemailer');
const { getEmailConfigRepository } = require('../../../emailConfig/infrastructure/repositories/emailConfigRepository');
const { getTicketByIdRepository } = require('../../infrastructure/repositories/ticketRepository');
const { getAdminsEmailsRepository } = require('../../../user/infrastructure/repositories/userRepository');

const kafka = new Kafka({
  clientId: 'email-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'ticket-email-group' });

let transporter;

const createTransporter = async () => {
  const emailConfig = await getEmailConfigRepository();
  if (!emailConfig) {
    throw new Error('No se encontró la configuración de correo.');
  }

  transporter = nodemailer.createTransport({
    host: emailConfig.smtpServer,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });
};

const sendEmail = async (newTicket, userEmail, adminEmails) => {
  const mailOptions = {
    from: transporter.options.auth.user,
    to: [userEmail, ...adminEmails].join(','),
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
            <td style="padding: 8px; border: 1px solid #ddd;">${newTicket.createdBy.username}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Fecha de creación:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date(newTicket.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Estado:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${newTicket.statusId.status}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #555;">Gracias por utilizar nuestro servicio.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendStatusChangeEmail = async (ticket, adminName, newStatus, userEmail) => {
  const mailOptions = {
    from: transporter.options.auth.user,
    to: userEmail,
    subject: `Cambio de estado a ${newStatus}`,
    html: `
      <div style="font-family: Arial, sans-serif; margin: 20px;">
        <h2 style="color: #333;">Cambio de estado del ticket</h2>
        <p style="color: #555;">El estado del ticket ha sido cambiado:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Título:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${ticket.title}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Descripción:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${ticket.description}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Estado nuevo:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${newStatus}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Cambiado por:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${adminName}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #555;">Gracias por utilizar nuestro servicio.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendHistoricoEmail = async (ticket, actionTake, description, adminName, userEmail) => {
  const mailOptions = {
    from: transporter.options.auth.user,
    to: userEmail,
    subject: `Nuevo seguimiento a tu ticket ${ticket.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; margin: 20px;">
        <h2 style="color: #333;">Nuevo seguimiento</h2>
        <p style="color: #555;">Se ha creado un nuevo seguimiento con los siguientes detalles:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Título:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${ticket.title}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Descripción:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${ticket.description}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Acción tomada:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${actionTake}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Nota:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${description}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Cambiado por:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${adminName}</td>
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

  try {
    await createTransporter();
    await consumer.connect();
    await consumer.subscribe({ topic: 'ticket-created', fromBeginning: true });
    await consumer.subscribe({ topic: 'ticket-status-changed', fromBeginning: true });
    await consumer.subscribe({ topic: 'ticket-historico-changed', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const data = JSON.parse(message.value.toString());
        
        try {
          if (topic === 'ticket-created') {
            const ticket = data;
            const userEmail = ticket.createdBy.email;
            const adminEmails = await getAdminsEmailsRepository();
            await sendEmail(ticket, userEmail, adminEmails);
          } else if (topic === 'ticket-status-changed') {
            const { ticketId, newStatus, adminName } = data;
            const ticket = await getTicketByIdRepository(ticketId);
            const userEmail = ticket.createdBy.email;
            await sendStatusChangeEmail(ticket, adminName, newStatus, userEmail);
          } else if (topic === 'ticket-historico-changed') {
            const { ticketId, actionTake, description, adminName } = data;
            const ticket = await getTicketByIdRepository(ticketId);
            const userEmail = ticket.createdBy.email;
            await sendHistoricoEmail(ticket, actionTake, description, adminName, userEmail);
          }
        } catch (err) {
          console.error(`Error procesando mensaje: ${err.message}`);
        }
      },
    });
  } catch (err) {
    console.error(`Error en el servicio: ${err.message}`);
  }
};

run().catch(console.error);

module.exports = { run };
