const express = require('express');
const { saveTicketAction, getAllTicketActions } = require('../api/ticketAction.controller');
const authenticateToken = require('../../middleware/authMiddleware');

const taskRouter = express.Router();
taskRouter.post('/saveTicketAction', authenticateToken, saveTicketAction);
taskRouter.get('/getTicketActions', authenticateToken, getAllTicketActions);

module.exports = taskRouter;