const { deleteHistoricoEntryRepository } = require('../infrastructure/repositories/historicoRepository');

async function deleteHistoricoEntryUseCase(historicoId) {
    return await deleteHistoricoEntryRepository(historicoId);
}

module.exports = { deleteHistoricoEntryUseCase };
