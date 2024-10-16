const { createTicketUseCase } = require('../application/create-ticket');
const { sendMessage } = require('../infrastructure/kafka/producer');
const { updateTicketUseCase } = require('../application/update-ticket');
const { updateTicketStatusUseCase } = require('../application/update-ticketStatus');
const { getTicketsByUserUseCase } = require('../application/get-ticket')
const { findUserByIdentityId } = require('../../user/infrastructure/repositories/userRepository');
const upload = require('../../middleware/uploadMiddleware'); 

async function saveTicket(req, res) {
    try {
        const user = await findUserByIdentityId(req.user.oid);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        const ticketRequest = {
            title: req.body.title,
            description: req.body.description,
            createdBy: user._id,
            adminId: null,
            filePath: req.file ? req.file.path : null 
        };
        const newTicket = await createTicketUseCase(ticketRequest);
        await sendMessage(newTicket);
        return res.status(201).json({ ticket: newTicket });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function updateTicket(req, res) {
    try {
        const user = await findUserByIdentityId(req.user.oid);
        const { ticketId, title, description } = req.body;

        const updateData = { title, description };
        const updatedTicket = await updateTicketUseCase(ticketId, updateData, user);

        return res.status(200).json({ ticket: updatedTicket });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function updateTicketStatus(req, res) {
    try {
        const user = await findUserByIdentityId(req.user.oid);
        const { ticketId, statusId } = req.body;

        if (!ticketId || !statusId) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        if (!user || user.roleId !== 'admin') {
            return res.status(403).json({ message: 'Solo los administradores pueden cambiar el estado del ticket.' });
        }

        const updatedTicket = await updateTicketStatusUseCase(ticketId, statusId, user._id);
        return res.status(200).json({ ticket: updatedTicket });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function getTicketsByUser(req, res) {
    try {
        const user = await findUserByIdentityId(req.user.oid);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const tickets = await getTicketsByUserUseCase(user);

        return res.status(200).json({ tickets });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

module.exports = { saveTicket, updateTicket, updateTicketStatus, getTicketsByUser };