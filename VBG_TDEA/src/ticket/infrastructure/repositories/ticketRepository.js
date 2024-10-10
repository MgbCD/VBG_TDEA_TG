const ticketModel = require('../models/ticket.model');
const { getTicketStatusByName } = require('../../../ticketStatus/infrastructure/repositories/ticketStatusRepository');

async function createTicketRepository(ticketRequest) {
    try {
        const createdStatus = await getTicketStatusByName('creado');

        if (!createdStatus) {
            throw new Error('Estado "creado" no encontrado.');
        }

        const ticket = new ticketModel({
            title: ticketRequest.title,
            description: ticketRequest.description,
            createdBy: ticketRequest.createdBy,
            statusId: createdStatus._id,
            createdAt: new Date(),
            updatedAt: new Date(),
            adminId: ticketRequest.adminId,
        });

        const savedTicket = await ticket.save();
        return savedTicket;
    } catch (error) {
        throw new Error(`Error al crear el ticket: ${error.message}`);
    }
}

async function getTicketRepositoryById(ticketId) {
    try {
        const ticket = await ticketModel.findById(ticketId);
        return ticket;
    } catch (error) {
        return error;
    }
}

async function updateTicketRepository(ticketId, updateData) {
    try {
        const ticket = await ticketModel.findById(ticketId);

        if (!ticket) {
            throw new Error('Ticket no encontrado.');
        }

        ticket.title = updateData.title || ticket.title;
        ticket.description = updateData.description || ticket.description;
        ticket.updatedAt = new Date();

        const updatedTicket = await ticket.save();
        return updatedTicket;
    } catch (error) {
        throw new Error(`Error al actualizar el ticket: ${error.message}`);
    }
}


async function updateTicketStatusRepository(ticketId, statusId, adminId) {
    try {
        const ticket = await ticketModel.findByIdAndUpdate(ticketId, {
            statusId: statusId,
            adminId: adminId,
            updatedAt: new Date(),
        }, { new: true });

        return ticket;
    } catch (error) {
        throw new Error(`Error al actualizar el ticket: ${error.message}`);
    }
}




module.exports = { createTicketRepository, getTicketRepositoryById, updateTicketRepository, updateTicketStatusRepository };