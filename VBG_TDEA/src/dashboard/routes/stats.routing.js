const express = require('express');
const { getDashboardStats } = require('../api/stats.controller');
const statsRouter = express.Router();

/**
 * @swagger
 * /dashboard/dashboard-stats:
 *   get:
 *     summary: Obtiene estadísticas del dashboard
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-12-31T23:59:59.999Z"
 *     responses:
 *       200:
 *         description: Estadísticas del dashboard obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketStats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       year:
 *                         type: integer
 *                       month:
 *                         type: integer
 *                       status:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 userStats:
 *                   type: integer
 *       400:
 *         description: Parámetros de fecha no válidos
 *       500:
 *         description: Error interno del servidor
 */
statsRouter.get('/dashboard-stats', getDashboardStats);

module.exports = statsRouter;
