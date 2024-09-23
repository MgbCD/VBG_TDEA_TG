const { ticketModel } = require('../models/ticket.model');

async function createTicketRepository(ticketRequest) {
    try {
        const ticket = new ticketModel({
            title: ticketRequest.title,
            description: ticketRequest.description,
            createdBy: ticketRequest.createdBy,
            statusId: ticketRequest.statusId,
            createdAt: ticketRequest.createdAt,
            updateAt: ticketRequest.updateAt,
            adminId: ticketRequest.adminId,
        });

        const save = await ticket.save();
        return save;
    } catch (error) {
        return error;
    }
}

module.exports = {createTicketRepository};