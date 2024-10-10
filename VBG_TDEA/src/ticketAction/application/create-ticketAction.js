const { createTicketActionRepository } = require('../infrastructure/repositories/ticketActionRepository');

async function createTicketActionUseCase(ticketRequest) {
    return await createTicketActionRepository(ticketRequest);
}

module.exports = { createTicketActionUseCase };