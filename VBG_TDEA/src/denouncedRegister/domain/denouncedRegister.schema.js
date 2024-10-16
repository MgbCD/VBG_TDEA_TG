const mongoose = require("mongoose");

const denouncedRegisterSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    denouncedName: {
        type: String,
        required: true
    },
    denouncedId: {
        type: String,
        required: true
    },
    denouncedPhone: {
        type: String,
        required: false
    },
    denouncedEmail: {
        type: String,
        required: false
    },
    relationshipWithVictim: {
        type: String,
        required: false
    },
    additionalInfo: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = { denouncedRegisterSchema };