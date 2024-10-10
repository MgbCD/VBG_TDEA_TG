const express = require('express');
const { saveTicket, updateTicket, updateTicketStatus } = require('../api/ticket.controller');
const authenticateToken = require('../../middleware/authMiddleware');

const taskRouter = express.Router();
taskRouter.post('/saveTicket', authenticateToken, saveTicket);
taskRouter.put('/updateTicket', authenticateToken, updateTicket);
taskRouter.put('/updateTicketStatus', authenticateToken, updateTicketStatus);

module.exports = taskRouter;