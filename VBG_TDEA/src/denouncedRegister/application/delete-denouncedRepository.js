const { deleteDenouncedRegisterRepository } = require('../infrastructure/repositories/denouncedRegisterRepository');

async function deleteDenouncedRegisterUseCase(ticketId) {
    return await deleteDenouncedRegisterRepository(ticketId);
}

module.exports = { deleteDenouncedRegisterUseCase };
