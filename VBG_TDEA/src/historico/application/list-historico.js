const { listHistoricoEntriesRepository } = require('../infrastructure/repositories/historicoRepository');

async function listHistoricoEntriesUseCase(filter, pagination) {
    return await listHistoricoEntriesRepository(filter, pagination);
}

module.exports = { listHistoricoEntriesUseCase };
