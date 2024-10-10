const { updateDenouncedRegisterRepository } = require('../infrastructure/repositories/denouncedRegisterRepository');

async function updateDenouncedRegisterUseCase(ticketId, updateRequest) {
    return await updateDenouncedRegisterRepository(ticketId, updateRequest);
}

module.exports = { updateDenouncedRegisterUseCase };
