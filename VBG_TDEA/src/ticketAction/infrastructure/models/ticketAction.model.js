const mongoose = require('mongoose');
const { ticketActionSchema } = require('../../domain/ticketAction.schema');

const ticketActionModel = mongoose.model('TicketAction', ticketActionSchema);

module.exports = ticketActionModel;