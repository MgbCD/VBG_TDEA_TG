const { createHistoricoUseCase } = require('../application/create-historico');
const { getHistoricoByTicketIdUseCase } = require('../application/get-historicoByTicketId');
const { updateHistoricoEntryUseCase } = require('../application/update-historico');
const { listHistoricoEntriesUseCase } = require('../application/list-historico');
const { deleteHistoricoEntryUseCase } = require('../application/delete-historico');
const { findUserByIdentityId } = require('../../user/infrastructure/repositories/userRepository');
const { sendMessage } = require('../../ticket/infrastructure/kafka/producer');

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

        const message = {
            ticketId: newHistorico.ticketId,
            actionTake: newHistorico.actionTaken.action,
            description: newHistorico.notes,
            adminName: user.username,
        };
        console.log(message);
        await sendMessage(message, 'ticket-historico-changed');

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

async function updateHistoricoEntry(req, res) {
    try {
        const user = await findUserByIdentityId(req.user.oid);

        if (!user || user.roleId !== 'admin') {
            return res.status(403).json({ message: 'Solo los administradores pueden realizar esta acción' });
        }

        const { historicoId, updatedData } = req.body;

        if (!historicoId || !updatedData) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        const updateRequest = {
            ...updatedData,
            updatedBy: user._id,
        };
        const updatedHistorico = await updateHistoricoEntryUseCase(historicoId, updateRequest);

        const message = {
            ticketId: updatedHistorico.ticketId,
            actionTake: updatedHistorico.actionTaken.action,
            description: updatedHistorico.notes,
            adminName: user.username,
        };
        await sendMessage(message, 'ticket-historico-changed');

        return res.status(200).json({ message: 'Entrada de histórico actualizada', updatedHistorico });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

async function listHistoricoEntries(req, res) {
    try {
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        const pagination = req.query.pagination ? JSON.parse(req.query.pagination) : { skip: 0, limit: 10 };

        const historicoEntries = await listHistoricoEntriesUseCase(filter, pagination);
        return res.status(200).json({ historicoEntries });
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

module.exports = { saveHistorico, getHistoricoByTicketId, updateHistoricoEntry, listHistoricoEntries, deleteHistoricoEntry };
