const { createTicketRepository } = require('../infrastructure/repositories/ticketRepository');

async function createTicketUseCase(ticketRequest) {
    return await createTicketRepository(ticketRequest);
}

module.exports = { createTicketUseCase };