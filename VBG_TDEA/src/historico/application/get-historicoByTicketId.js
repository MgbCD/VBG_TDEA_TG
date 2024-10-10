const { getHistoricoByTicketIdRepository } = require('../infrastructure/repositories/historicoRepository');

async function getHistoricoByTicketIdUseCase(ticketId) {
    return await getHistoricoByTicketIdRepository(ticketId);
}

module.exports = { getHistoricoByTicketIdUseCase };
