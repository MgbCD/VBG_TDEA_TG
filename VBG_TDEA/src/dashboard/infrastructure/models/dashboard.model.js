const mongoose = require('mongoose');
const { dashboardSchema } = require('../../domain/dashboard.schema');

const dashboardSchema = mongoose.model('Dashboard', dashboardSchema);

module.exports = dashboardSchema;