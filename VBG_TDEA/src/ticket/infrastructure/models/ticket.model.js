const mongoose = require('mongoose');
const { ticketSchema } = require('../../domain/ticket.schema');

const ticketModel = mongoose.model('Ticket', ticketSchema);

module.exports = { ticketModel };