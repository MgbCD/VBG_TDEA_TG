const mongoose = require("mongoose");

const ticketStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

});

module.exports = { ticketStatusSchema };