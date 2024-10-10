const express = require('express');
const { saveDenouncedRegister, getDenouncedRegisterByTicketId, updateDenouncedRegister, listDenouncedRegisters, deleteDenouncedRegister } = require('../api/denouncedRegister.controller');

const denouncedRegisterRouter = express.Router();

denouncedRegisterRouter.post('/saveDenouncedRegister', saveDenouncedRegister);
denouncedRegisterRouter.get('/getDenouncedRegister/:ticketId', getDenouncedRegisterByTicketId);
denouncedRegisterRouter.put('/updateDenouncedRegister', updateDenouncedRegister);
denouncedRegisterRouter.get('/listDenouncedRegisters', listDenouncedRegisters);
denouncedRegisterRouter.delete('/deleteDenouncedRegister', deleteDenouncedRegister);

module.exports = denouncedRegisterRouter;
