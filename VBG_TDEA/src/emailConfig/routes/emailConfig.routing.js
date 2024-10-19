const express = require('express');
const { updateEmailConfig, getEmailConfiguration } = require('../api/emailConfig.controller');

const emailConfigRouter = express.Router();

emailConfigRouter.get('/email-config', getEmailConfiguration);
emailConfigRouter.put('/email-config', updateEmailConfig);

module.exports = emailConfigRouter;
