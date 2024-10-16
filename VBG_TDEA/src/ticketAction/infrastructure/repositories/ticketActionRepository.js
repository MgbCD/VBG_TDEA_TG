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

module.exports = { createTicketActionRepository };