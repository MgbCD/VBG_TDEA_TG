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

        const populatedHistorico = await historicoModel.findById(savedHistorico._id)
            .populate('actionTaken', 'action')

        return populatedHistorico;
    } catch (error) {
        throw new Error(`Error al crear el registro histórico: ${error.message}`);
    }
}

async function getHistoricoByTicketIdRepository(ticketId) {
    try {
        const historico = await historicoModel
            .find({ ticketId })
            .populate({
                path: 'actionTaken',
                select: 'action',
            })
            .populate({
                path: 'actionBy', // Asegúrate de que este sea el campo correcto
                select: 'username', // Asegúrate de que este sea el campo que almacena el nombre del usuario
            })
            .populate({
                path: 'updatedBy', // Si quieres también obtener el nombre de quien actualizó
                select: 'username',
            });

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
        ).populate('actionTaken', 'action');
        
        return updatedEntry;
    } catch (error) {
        throw new Error(`Error al actualizar el registro histórico: ${error.message}`);
    }
}


async function listHistoricoEntriesRepository(filter, pagination) {
    try {
        const entries = await historicoModel.find(filter)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .populate('actionTaken', 'action');
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
