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
                path: 'actionBy',
                select: 'username',
            })
            .populate({
                path: 'updatedBy',
                select: 'username',
            });

        return historico;
    } catch (error) {
        throw new Error(`Error al obtener el registro histórico: ${error.message}`);
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

module.exports = { createHistoricoRepository, getHistoricoByTicketIdRepository, deleteHistoricoEntryRepository };
