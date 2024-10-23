const { getAllTicketStatusesRepository } = require('../infrastructure/repositories/ticketStatusRepository');

const getAllTicketStatusesUseCase = async () => {
    try {
        const statuses = await getAllTicketStatusesRepository();
        return statuses;
    } catch (error) {
        throw new Error(`Error en el caso de uso: ${error.message}`);
    }
};

module.exports = { getAllTicketStatusesUseCase };