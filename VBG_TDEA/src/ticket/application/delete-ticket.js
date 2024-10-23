const { deleteTicketRepository } = require('../infrastructure/repositories/ticketRepository');

async function deleteTicketUseCase(ticketId, user) {
    return await deleteTicketRepository(ticketId, user._id);
}

module.exports = { deleteTicketUseCase };
