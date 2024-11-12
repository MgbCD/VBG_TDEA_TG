const express = require('express');
const { saveTicketAction, getAllTicketActions } = require('../api/ticketAction.controller');
const authenticateToken = require('../../middleware/authMiddleware');
const taskRouter = express.Router();

/**
 * @swagger
 * /ticket-action/saveTicketAction:
 *   post:
 *     summary: Crea una nueva acción de ticket
 *     tags: [Acciones de Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 example: "Sanciones"
 *               description:
 *                 type: string
 *                 example: "Fase #10 Administrativas - Disciplinarias - Penales"
 *     responses:
 *       201:
 *         description: Acción de ticket creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketAction:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67130ea51bddd9886c9d4153"
 *                     action:
 *                       type: string
 *                       example: "Sanciones"
 *                     description:
 *                       type: string
 *                       example: "Fase #10 Administrativas - Disciplinarias - Penales"
 *       403:
 *         description: Solo los administradores pueden hacer esta acción
 *       500:
 *         description: Error interno del servidor
 */
taskRouter.post('/saveTicketAction', authenticateToken, saveTicketAction);

/**
 * @swagger
 * /ticket-action/getTicketActions:
 *   get:
 *     summary: Obtiene todas las acciones de tickets
 *     tags: [Acciones de Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de acciones de tickets obtenida exitosamente
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
 *                   action:
 *                     type: string
 *                     example: "Sanciones"
 *                   description:
 *                     type: string
 *                     example: "Fase #10 Administrativas - Disciplinarias - Penales"
 *       500:
 *         description: Error interno del servidor
 */
taskRouter.get('/getTicketActions', authenticateToken, getAllTicketActions);

module.exports = taskRouter;