const { createTicketUseCase } = require('../application/create-ticket');
const { updateTicketUseCase } = require('../application/update-ticket');
const { ExceptionMissingField } = require('../exceptions/ExceptionMissingField');

async function saveTicket(req, res) {
    try {

        const { title, description } = req.body;
        if (!title || !description) {
            throw new ExceptionMissingField();
        }
        const newTicket = await createTicketUseCase(req.body);
        return res.status(201).json({ ticket: newTicket });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function updateTicketStatus(req, res) {
    try {
        const { ticketId, title, description } = req.body;

        // Validar si los campos requeridos están presentes
        if (!ticketId) {
            throw new ExceptionMissingField('El ID del ticket es requerido.');
        }

        // Ejecutar el caso de uso de actualización
        const updateData = { title, description }; // Incluye otros campos si es necesario
        const updatedTicket = await updateTicketUseCase(ticketId, updateData);

        // Comprobar si el ticket fue actualizado
        if (updatedTicket instanceof Error) {
            return res.status(403).json({ message: updatedTicket.message });
        }

        // Retornar el ticket actualizado
        return res.status(200).json({ ticket: updatedTicket });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

module.exports = { saveTicket, updateTicketStatus };