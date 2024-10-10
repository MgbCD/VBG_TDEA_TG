const { getTicketStatusByIdRepository } = require('../../../src/ticketStatus/infrastructure/repositories/ticketStatusRepository');
const { updateTicketRepository } = require('../infrastructure/repositories/ticketRepository');
const ticketModel = require('../infrastructure/models/ticket.model');

async function updateTicketUseCase(ticketId, updateData, user) {
    const ticket = await ticketModel.findById(ticketId).populate('statusId');
    if (!ticket) {
        throw new Error("Ticket no encontrado.");
    }

    if (ticket.statusId.status !== 'creado') {
        throw new Error('No puedes modificar este ticket porque ya no está en estado creado.');
    }

    if (ticket.createdBy.toString() !== user._id.toString()) {
        throw new Error('No tienes permisos para modificar este ticket.');
    }

    const updatedTicket = await updateTicketRepository(ticketId, updateData);
    return updatedTicket;
}

module.exports = { updateTicketUseCase };
