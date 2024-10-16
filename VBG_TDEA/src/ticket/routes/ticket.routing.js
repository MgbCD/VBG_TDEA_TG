const express = require('express');
const { saveTicket, updateTicket, updateTicketStatus, getTicketsByUser } = require('../api/ticket.controller');
const authenticateToken = require('../../middleware/authMiddleware');
const upload = require('../../middleware/uploadMiddleware'); 


const taskRouter = express.Router();
taskRouter.post('/saveTicket', authenticateToken, upload.single('file'), saveTicket); 
taskRouter.put('/updateTicket', authenticateToken, updateTicket);
taskRouter.put('/updateTicketStatus', authenticateToken, updateTicketStatus);
taskRouter.get('/my-tickets', authenticateToken, getTicketsByUser);

module.exports = taskRouter;