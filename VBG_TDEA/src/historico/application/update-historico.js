const { updateHistoricoEntryRepository } = require('../infrastructure/repositories/historicoRepository');

async function updateHistoricoEntryUseCase(historicoId, updateRequest) {
    return await updateHistoricoEntryRepository(historicoId, updateRequest);
}

module.exports = { updateHistoricoEntryUseCase };
