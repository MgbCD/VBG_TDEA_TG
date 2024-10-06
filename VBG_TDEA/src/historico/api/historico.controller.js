const { createHistoricoUseCase } = require('../application/create-historico');
const { getHistoricoByTicketIdUseCase } = require('../application/get-historicoByTicketId');
const { updateHistoricoEntryUseCase } = require('../application/update-historico');
const { listHistoricoEntriesUseCase } = require('../application/list-historico');
const { deleteHistoricoEntryUseCase } = require('../application/delete-historico');

// Crear entrada en el historico
async function saveHistorico(req, res) {
    try {
        const newHistorico = await createHistoricoUseCase(req.body);
        return res.status(201).json({ historico: newHistorico });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

// Obtener historico por ticketId
async function getHistoricoByTicketId(req, res) {
    try {
        const { ticketId } = req.params;

        const historico = await getHistoricoByTicketIdUseCase(ticketId);
        return res.status(200).json({ historico });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

// Actualizar entrada del histórico
async function updateHistoricoEntry(req, res) {
    try {
        const { historicoId, updatedData } = req.body;

        if (!historicoId || !updatedData) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        const updatedHistorico = await updateHistoricoEntryUseCase(historicoId, updatedData);
        return res.status(200).json({ message: 'Entrada de histórico actualizada', updatedHistorico });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

// Listar todas las entradas del histórico
async function listHistoricoEntries(req, res) {
    try {
        // Desestructuración de parámetros de la consulta
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        const pagination = req.query.pagination ? JSON.parse(req.query.pagination) : { skip: 0, limit: 10 };

        const historicoEntries = await listHistoricoEntriesUseCase(filter, pagination);
        return res.status(200).json({ historicoEntries });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
}

// Eliminar entrada del histórico
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
