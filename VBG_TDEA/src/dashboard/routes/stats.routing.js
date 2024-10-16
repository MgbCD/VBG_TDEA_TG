const express = require('express');
const { getDashboardStats } = require('../api/stats.controller');

const statsRouter = express.Router();
statsRouter.get('/dashboard-stats', getDashboardStats);

module.exports = statsRouter;
