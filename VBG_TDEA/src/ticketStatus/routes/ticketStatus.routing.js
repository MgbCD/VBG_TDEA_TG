const express = require('express');
const { saveTicketStatus, getAllTicketStatuses } = require('../api/ticketStatus.controller');
const authenticateToken = require('../../middleware/authMiddleware');
const taskRouter = express.Router();

/**
 * @swagger
 * /ticket-status/saveTicketStatus:
 *   post:
 *     summary: Crea un nuevo estado de ticket
 *     tags: [Estado de Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Archivado"
 *               description:
 *                 type: string
 *                 example: "El ticket ha sido archivado"
 *     responses:
 *       201:
 *         description: Estado de ticket creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketStatus:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67130ea51bddd9886c9d4153"
 *                     status:
 *                       type: string
 *                       example: "Archivado"
 *                     description:
 *                       type: string
 *                       example: "El ticket ha sido archivado"
 *       400:
 *         description: Solicitud incorrecta (faltan datos)
 *       500:
 *         description: Error interno del servidor
 */
taskRouter.post('/saveTicketStatus', authenticateToken, saveTicketStatus);

/**
 * @swagger
 * /ticket-status/getTicketStatus:
 *   get:
 *     summary: Obtiene todos los estados de ticket
 *     tags: [Estado de Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados de ticket
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "67130ea51bddd9886c9d4153"
 *                   status:
 *                     type: string
 *                     example: "Archivado"
 *                   description:
 *                     type: string
 *                     example: "El ticket ha sido archivado"
 *       500:
 *         description: Error interno del servidor
 */
taskRouter.get('/getTicketStatus', authenticateToken, getAllTicketStatuses);

module.exports = taskRouter;