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

async function updateTicketRepository(ticketId, updateRequest) {
    try {
        const ticket = await ticketModel.findById(ticketId).populate('statusId');

        if (!ticket) {
            throw new Error('Ticket no encontrado.');
        }

        if (ticket.statusId.status === 'creado') {
            // Actualiza los campos del ticket
            ticket.title = updateRequest.title || ticket.title;
            ticket.description = updateRequest.description || ticket.description;
            ticket.updatedAt = new Date();

            // Si necesitas cambiar el estado del ticket, descomentar la siguiente sección
            /*
            if (updateRequest.statusId && updateRequest.statusId !== ticket.statusId) {
                if (!updateRequest.adminId) {
                    throw new Error('Solo los administradores pueden actualizar el estado del ticket.');
                }
                ticket.statusId = updateRequest.statusId;
                ticket.adminId = updateRequest.adminId;
            }
            */

            const updatedTicket = await ticket.save();
            return updatedTicket;
        } else {
            throw new Error('El ticket no se puede actualizar porque ya no está en estado creado.');
        }
    } catch (error) {
        throw new Error(`Error al actualizar el ticket: ${error.message}`);
    }
}

async function updateTicketStatusRepository(ticketId, statusId) {
    try {
        const ticket = await ticketModel.findByIdAndUpdate(ticketId, {
            statusId: statusId,
            updatedAt: new Date()
        }, { new: true });

        return ticket;
    } catch (error) {
        return error;
    }
}



module.exports = { createTicketRepository, getTicketRepositoryById, updateTicketRepository, updateTicketStatusRepository };