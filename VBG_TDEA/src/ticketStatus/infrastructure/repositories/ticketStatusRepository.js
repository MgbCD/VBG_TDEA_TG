const ticketStatusModel = require('../models/ticketStatus.model');

async function createTicketStatusRepository(ticketStatusRequest) {
    try {
        const ticketStatus = new ticketStatusModel({
            status: ticketStatusRequest.status,
            description: ticketStatusRequest.description,
        });

        const save = await ticketStatus.save();
        return save;
    } catch (error) {
        return error;
    }
}

async function getTicketStatusByIdRepository(statusId) {
    try {

        const status = await ticketStatusModel.findById(statusId);

        return status;
    } catch (error) {
        return error;
    }
}

async function getTicketStatusByName(statusName) {
    try {
        const status = await ticketStatusModel.findOne({ status: statusName });
        return status;
    } catch (error) {
        throw new Error(`Error al obtener el estado: ${error.message}`);
    }
}

async function getAllTicketStatusesRepository() {
    try {
        const statuses = await ticketStatusModel.find();
        return statuses;
    } catch (error) {
        throw new Error(`Error al obtener los estados: ${error.message}`);
    }
};

module.exports = { createTicketStatusRepository, getTicketStatusByIdRepository, getTicketStatusByName, getAllTicketStatusesRepository };