const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
    month: {
        type: Number, 
        required: true,
    },
    year: {
        type: Number,  
        required: true,
    },
    usersLoggedIn: {
        type: Number,  
        default: 0,
    },
    ticketsCreated: {
        type: Number,  
        default: 0,
    },
    ticketsArchived: {
        type: Number,  
        default: 0,
    },
    ticketsFinalized: {
        type: Number, 
        default: 0,
    },
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
