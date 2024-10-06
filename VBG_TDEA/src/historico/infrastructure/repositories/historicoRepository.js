const historicoModel = require('../models/historico.model');

async function createHistoricoRepository(historicoRequest) {
    try {
        const historico = new historicoModel({
            ticketId: historicoRequest.ticketId,
            actionTaken: historicoRequest.actionTaken,
            notes: historicoRequest.notes,
            actionBy: historicoRequest.actionBy,
        });

        const savedHistorico = await historico.save();
        return savedHistorico;
    } catch (error) {
        throw new Error(`Error al crear el registro histórico: ${error.message}`);
    }
}

async function getHistoricoByTicketIdRepository(ticketId) {
    try {
        const historico = await historicoModel.find({ ticketId });
        return historico;
    } catch (error) {
        throw new Error(`Error al obtener el registro histórico: ${error.message}`);
    }
}

async function updateHistoricoEntryRepository(historicoId, updateRequest) {
    try {
        const updatedEntry = await historicoModel.findByIdAndUpdate(
            historicoId,
            updateRequest,
            { new: true }
        );
        return updatedEntry;
    } catch (error) {
        throw new Error(`Error al actualizar el registro histórico: ${error.message}`);
    }
}

async function listHistoricoEntriesRepository(filter, pagination) {
    try {
        const entries = await historicoModel.find(filter)
            .skip(pagination.skip)
            .limit(pagination.limit);
        return entries;
    } catch (error) {
        throw new Error(`Error al listar los registros históricos: ${error.message}`);
    }
}

async function deleteHistoricoEntryRepository(historicoId) {
    try {
        await historicoModel.findByIdAndDelete(historicoId);
        return { message: "Registro histórico eliminado exitosamente." };
    } catch (error) {
        throw new Error(`Error al eliminar el registro histórico: ${error.message}`);
    }
}

module.exports = { createHistoricoRepository, getHistoricoByTicketIdRepository, updateHistoricoEntryRepository, listHistoricoEntriesRepository, deleteHistoricoEntryRepository };
