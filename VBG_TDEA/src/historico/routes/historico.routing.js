const express = require('express');
const { saveHistorico, getHistoricoByTicketId, updateHistoricoEntry, listHistoricoEntries, deleteHistoricoEntry } = require('../api/historico.controller');

const historicoRouter = express.Router();

historicoRouter.post('/saveHistorico', saveHistorico);
historicoRouter.get('/getHistorico/:ticketId', getHistoricoByTicketId);
historicoRouter.put('/updateHistoricoEntry', updateHistoricoEntry);
historicoRouter.get('/listHistoricoEntries', listHistoricoEntries);
historicoRouter.delete('/deleteHistoricoEntry', deleteHistoricoEntry);

module.exports = historicoRouter;
