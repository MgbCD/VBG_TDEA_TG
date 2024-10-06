const { createHistoricoRepository } = require('../infrastructure/repositories/historicoRepository');

async function createHistoricoUseCase(historicoRequest) {
    return await createHistoricoRepository(historicoRequest);
}

module.exports = { createHistoricoUseCase };
