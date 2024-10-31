const { getAllTicketActionsRepository } = require('../infrastructure/repositories/ticketActionRepository');

const getAllTicketActionsUseCase = async () => {
    try {
        const actions = await getAllTicketActionsRepository();
        return actions;
    } catch (error) {
        throw new Error(`Error en el caso de uso: ${error.message}`);
    }
};

module.exports = { getAllTicketActionsUseCase };