const mongoose = require('mongoose');

const emailConfigSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    smtpServer: {
        type: String,
        required: true,
        default: 'smtp.office365.com'
    },
    port: {
        type: Number,
        required: true,
        default: 587
    },
    secure: {
        type: Boolean,
        required: true,
        default: false
    },
});

module.exports = { emailConfigSchema };
