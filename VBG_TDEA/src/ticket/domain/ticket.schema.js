const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TicketStatus',
    },

    createdAt: {
        type: Date,
    },

    updatedAt: {
        type: Date,
    },

    adminId: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = { ticketSchema };