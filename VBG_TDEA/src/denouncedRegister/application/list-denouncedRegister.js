const { listDenouncedRegistersRepository } = require('../infrastructure/repositories/denouncedRegisterRepository');

async function listDenouncedRegistersUseCase(filter, pagination) {
    return await listDenouncedRegistersRepository(filter, pagination);
}

module.exports = { listDenouncedRegistersUseCase };
