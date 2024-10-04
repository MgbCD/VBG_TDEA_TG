const { getDenouncedRegisterByTicketIdRepository } = require('../infrastructure/repositories/denouncedRegisterRepository');

async function getDenouncedRegisterByTicketIdUseCase(ticketId) {
    return await getDenouncedRegisterByTicketIdRepository(ticketId);
}

module.exports = { getDenouncedRegisterByTicketIdUseCase };
