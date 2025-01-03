const mongoose = require('mongoose');

const historicoSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    actionTaken: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TicketAction',
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    actionBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    actionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = { historicoSchema };
