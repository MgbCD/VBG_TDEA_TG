const mongoose = require('mongoose');
const { emailConfigSchema } = require('../../domain/emailConfig.schema');

const emailConfigModel = mongoose.model('EmailConfig', emailConfigSchema);

module.exports = emailConfigModel;