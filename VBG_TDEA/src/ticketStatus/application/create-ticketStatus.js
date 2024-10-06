const { createTicketStatusRepository } = require('../infrastructure/repositories/ticketStatusRepository');

async function createTicketStatusUseCase(ticketRequest) {
    return await createTicketStatusRepository(ticketRequest);
}

module.exports = { createTicketStatusUseCase };