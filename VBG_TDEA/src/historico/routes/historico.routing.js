const express = require('express');
const { saveHistorico, getHistoricoByTicketId, updateHistoricoEntry, listHistoricoEntries, deleteHistoricoEntry } = require('../api/historico.controller');
const authenticateToken = require('../../middleware/authMiddleware');

const historicoRouter = express.Router();

// Rutas para el historial del ticket
historicoRouter.post('/saveHistorico', authenticateToken, saveHistorico);
historicoRouter.get('/getHistorico/:ticketId', getHistoricoByTicketId);
historicoRouter.put('/updateHistoricoEntry', authenticateToken, updateHistoricoEntry);
historicoRouter.get('/listHistoricoEntries', listHistoricoEntries);
historicoRouter.delete('/deleteHistoricoEntry', deleteHistoricoEntry);

module.exports = historicoRouter;
