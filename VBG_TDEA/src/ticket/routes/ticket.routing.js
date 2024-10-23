const express = require('express');
const { saveTicket, updateTicket, updateTicketStatus, getTicketsByUser, deleteTicket } = require('../api/ticket.controller');
const authenticateToken = require('../../middleware/authMiddleware');
const upload = require('../../middleware/uploadMiddleware'); 


const taskRouter = express.Router();
taskRouter.post('/saveTicket', authenticateToken, upload.single('file'), saveTicket); 
taskRouter.put('/updateTicket', authenticateToken, upload.single('file'), updateTicket);
taskRouter.put('/updateTicketStatus', authenticateToken, updateTicketStatus);
taskRouter.get('/my-tickets', authenticateToken, getTicketsByUser);
taskRouter.delete('/deleteTicket', authenticateToken, deleteTicket);

module.exports = taskRouter;