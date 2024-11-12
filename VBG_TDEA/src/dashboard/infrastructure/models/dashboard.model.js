const mongoose = require('mongoose');
const { dashboardSchema } = require('../../domain/dashboard.schema');

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;