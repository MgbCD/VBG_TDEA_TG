const ticketModel = require('../models/ticket.model');
const { getTicketStatusByName } = require('../../../ticketStatus/infrastructure/repositories/ticketStatusRepository');

async function createTicketRepository(ticketRequest) {
    try {
        const createdStatus = await getTicketStatusByName('Creado');

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
            filePath: ticketRequest.filePath || null,

        });

        const savedTicket = await ticket.save();

        const populatedTicket = await ticketModel.findById(savedTicket._id)
            .populate('createdBy', 'username email')
            .populate('statusId', 'status');

        return populatedTicket;
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

        // Aquí manejamos el archivo
        if (updateData.attachment) { // Asegúrate de que esto refleje la clave correcta
            ticket.filePath = updateData.attachment.path; // Usa la propiedad correcta del archivo
        }

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

        const populatedTicket = await ticketModel.findById(ticketId)
            .populate('statusId', 'status');

        return populatedTicket;

    } catch (error) {
        throw new Error(`Error al actualizar el ticket: ${error.message}`);
    }
}

async function getAllTicketsRepository() {
    try {
        const tickets = await ticketModel.find().populate('createdBy', 'username').populate('statusId', 'status');
        return tickets;
    } catch (error) {
        throw new Error(`Error al obtener los tickets: ${error.message}`);
    }
}

async function getTicketsByUserRepository(userId) {
    try {
        const tickets = await ticketModel.find({ createdBy: userId })
            .populate('createdBy', 'username')
            .populate('statusId', 'status');
        return tickets;
    } catch (error) {
        throw new Error(`Error al obtener los tickets: ${error.message}`);
    }
}

async function getTicketByIdRepository(ticketId) {
    try {
        const ticket = await ticketModel.findById(ticketId)
            .populate('createdBy', 'username email')
            .populate('statusId', 'status');

        if (!ticket) {
            throw new Error('Ticket no encontrado.');
        }

        return ticket;
    } catch (error) {
        throw new Error(`Error al obtener el ticket: ${error.message}`);
    }
}

async function deleteTicketRepository(ticketId, userId) {
    try {
        const ticket = await ticketModel.findById(ticketId);

        if (!ticket) {
            throw new Error('Ticket no encontrado.');
        }

        const createdStatus = await getTicketStatusByName('Creado');
        if (ticket.statusId.toString() !== createdStatus._id.toString()) {
            throw new Error('Solo se puede eliminar un ticket en estado "Creado".');
        }

        if (ticket.createdBy.toString() !== userId.toString()) {
            throw new Error('No tienes permisos para eliminar este ticket.');
        }

        await ticketModel.deleteOne({ _id: ticketId });
        return { message: 'Ticket eliminado exitosamente.' };
    } catch (error) {
        throw new Error(`Error al eliminar el ticket: ${error.message}`);
    }
}

module.exports = { createTicketRepository, getTicketRepositoryById, updateTicketRepository, updateTicketStatusRepository, getAllTicketsRepository, getTicketsByUserRepository, getTicketByIdRepository, deleteTicketRepository };