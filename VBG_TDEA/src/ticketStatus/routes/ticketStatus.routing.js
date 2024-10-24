const express = require('express');
const { saveTicketStatus, getAllTicketStatuses } = require('../api/ticketStatus.controller');

const taskRouter = express.Router();
taskRouter.post('/saveTicketStatus', saveTicketStatus);
taskRouter.get('/getTicketStatus', getAllTicketStatuses);

module.exports = taskRouter;