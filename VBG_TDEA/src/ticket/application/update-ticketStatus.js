const { updateTicketStatusRepository } = require('../infrastructure/repositories/ticketRepository');

async function updateTicketStatusUseCase(ticketId, statusId, adminId) {
    const updatedTicket = await updateTicketStatusRepository(ticketId, statusId, adminId);
    return updatedTicket;
}

module.exports = { updateTicketStatusUseCase };
