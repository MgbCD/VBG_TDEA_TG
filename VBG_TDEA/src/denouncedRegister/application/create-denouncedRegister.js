const { createDenouncedRegisterRepository } = require('../infrastructure/repositories/denouncedRegisterRepository');

async function createDenouncedRegisterUseCase(denouncedRegisterRequest) {
    return await createDenouncedRegisterRepository(denouncedRegisterRequest);
}

module.exports = { createDenouncedRegisterUseCase };
