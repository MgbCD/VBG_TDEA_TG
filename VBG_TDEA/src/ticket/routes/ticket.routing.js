const express = require('express');
const { saveTicket, updateTicketStatus } = require('../api/ticket.controller');

const taskRouter = express.Router();
taskRouter.post('/saveTicket', saveTicket);
taskRouter.put('/updateTicket', updateTicketStatus);

module.exports = taskRouter;