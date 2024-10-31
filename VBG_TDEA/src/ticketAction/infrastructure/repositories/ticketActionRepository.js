const ticketActionModel = require('../models/ticketAction.model');

async function createTicketActionRepository(ticketActionRequest) {
    try {
        const ticketAction = new ticketActionModel({
            action: ticketActionRequest.action,
            description: ticketActionRequest.description,
        });

        const save = await ticketAction.save();
        return save;
    } catch (error) {
        return error;
    }
}

async function getAllTicketActionsRepository() {
    try {
        const actions = await ticketActionModel.find();
        return actions;
    } catch (error) {
        throw new Error(`Error al obtener las acciones: ${error.message}`);
    }
};

module.exports = { createTicketActionRepository, getAllTicketActionsRepository };