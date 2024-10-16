const mongoose = require("mongoose");

const ticketActionSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

});

module.exports = { ticketActionSchema };