const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
    },

    statusId:{
        type: Object,
    },

    createdAt:{
        type: Date,
    },

    updateAt:{
        type: Date,
    },

    adminId:{
        type: Object,
    },
});

module.exports = {ticketSchema};