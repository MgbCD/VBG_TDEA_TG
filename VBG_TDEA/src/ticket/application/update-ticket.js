const { getTicketStatusByIdRepository } = require('../../../src/ticketStatus/infrastructure/repositories/ticketStatusRepository');
const { updateTicketRepository } = require('../infrastructure/repositories/ticketRepository');
const ticketModel = require('../infrastructure/models/ticket.model')

async function updateTicketUseCase(ticketId, updateData) {

    const ticket = await ticketModel.findById(ticketId);
    if (!ticket) {
        throw new Error("Ticket no encontrado.");
    }

    const status = await getTicketStatusByIdRepository(ticket.statusId);
    if (!status) {
        throw new Error("Estado del ticket no encontrado.");
    }

    if (status.status === "creado") {
        return await updateTicketRepository(ticketId, updateData);
    } else {
        throw new Error("Actualización fallida: el ticket no se puede actualizar porque ya ha sido iniciado");
    }
}

module.exports = { updateTicketUseCase };
