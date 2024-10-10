const express = require('express');
const { saveTicketStatus } = require('../api/ticketStatus.controller');

const taskRouter = express.Router();
taskRouter.post('/saveTicketStatus', saveTicketStatus);

module.exports = taskRouter;