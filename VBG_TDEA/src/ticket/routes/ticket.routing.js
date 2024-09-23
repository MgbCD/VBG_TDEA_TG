const express = require('express');
const {saveTicket} = require('../api/ticket.controller');

const taskRouter = express.Router();
taskRouter.post('/saveTicket', saveTicket);

module.exports = taskRouter;