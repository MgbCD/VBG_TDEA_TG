const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },
    ticketStats: [
        {
            status: {
                type: String,
                required: true,
            },
            count: {
                type: Number,
                required: true,
            }
        }
    ],
    userStats: {
        type: Number,
        required: true,
    }
});

module.exports = { dashboardSchema };
