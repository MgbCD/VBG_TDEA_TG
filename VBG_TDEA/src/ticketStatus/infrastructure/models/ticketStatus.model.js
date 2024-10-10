const mongoose = require('mongoose');
const { ticketStatusSchema } = require('../../domain/ticketStatus.schema');

const ticketStatusModel = mongoose.model('TicketStatus', ticketStatusSchema);

module.exports = ticketStatusModel;