const express = require('express');
const { saveTicketAction } = require('../api/ticketAction.controller');
const authenticateToken = require('../../middleware/authMiddleware');

const taskRouter = express.Router();
taskRouter.post('/saveTicketAction', authenticateToken, saveTicketAction);

module.exports = taskRouter;