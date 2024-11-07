const { createHistoricoUseCase } = require('../application/create-historico');
const { getHistoricoByTicketIdUseCase } = require('../application/get-historicoByTicketId');
const { deleteHistoricoEntryUseCase } = require('../application/delete-historico');
const { findUserByIdentityId } = require('../../user/infrastructure/repositories/userRepository');

async function saveHistorico(req, res) {
    try {
        const user = await findUserByIdentityId(req.user.oid);

        if (!user || user.roleId !== 'admin') {
            return res.status(403).json({ message: 'Solo los administradores pueden realizar esta acción' });
        }

        const historicoRequest = {
            ticketId: req.body.ticketId,
            actionTaken: req.body.actionTaken,
            notes: req.body.notes,
            updatedBy: null,
            actionBy: user._id,
        };

        const newHistorico = await createHistoricoUseCase(historicoRequest);

   

        return res.status(201).json({ historico: newHistorico });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function getHistoricoByTicketId(req, res) {
    try {
        const { ticketId } = req.params;

        const historico = await getHistoricoByTicketIdUseCase(ticketId);
        return res.status(200).json({ historico });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function deleteHistoricoEntry(req, res) {
    try {
        const { historicoId } = req.body;

        if (!historicoId) {
            return res.status(400).json({ message: 'Falta el ID de la entrada histórica' });
        }

        const deletedHistoricoEntry = await deleteHistoricoEntryUseCase(historicoId);
        return res.status(200).json({ message: 'Entrada de histórico eliminada', deletedHistoricoEntry });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

module.exports = { saveHistorico, getHistoricoByTicketId, deleteHistoricoEntry };
