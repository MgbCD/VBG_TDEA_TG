const express = require('express');
const { saveHistorico, getHistoricoByTicketId, deleteHistoricoEntry } = require('../api/historico.controller');
const authenticateToken = require('../../middleware/authMiddleware');
const historicoRouter = express.Router();

/**
 * @swagger
 * /historico/saveHistorico:
 *   post:
 *     summary: Guarda una nueva entrada en el histórico
 *     tags: [Histórico]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: string
 *                 example: "67104d3c61367926388af986"
 *               actionTaken:
 *                 type: string
 *                 example: "66f9ee999d07f13097358b66"
 *               notes:
 *                 type: string
 *                 example: "Se ha derivado a la víctima a la unidad de apoyo psicológico para seguimiento."
 *     responses:
 *       201:
 *         description: Entrada de histórico creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 historico:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6725752cdbaee465c4a98aa8"
 *                     ticketId:
 *                       type: string
 *                       example: "672569be8fb67490f57edd0c"
 *                     actionTaken:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "67130ea51bddd9886c9d4153"
 *                         action:
 *                           type: string
 *                           example: "Activar Ruta"
 *                     notes:
 *                       type: string
 *                       example: "Nuevo seguimiento prueba"
 *                     actionBy:
 *                       type: string
 *                       example: "670f3cad790a3f8ce0571333"
 *                     actionDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-02T00:41:16.433Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       403:
 *         description: Solo los administradores pueden realizar esta acción
 *       500:
 *         description: Error interno del servidor
 */
historicoRouter.post('/saveHistorico', authenticateToken, saveHistorico);

/**
 * @swagger
 * /historico/getHistorico/{ticketId}:
 *   get:
 *     summary: Obtiene el histórico de un ticket por su ID
 *     tags: [Histórico]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: ticketId
 *         in: path
 *         required: true
 *         description: ID del ticket para obtener su histórico
 *         schema:
 *           type: string
 *           example: "672569be8fb67490f57edd0c"
 *     responses:
 *       200:
 *         description: Histórico del ticket obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 historico:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6725752cdbaee465c4a98aa8"
 *                       ticketId:
 *                         type: string
 *                         example: "672569be8fb67490f57edd0c"
 *                       actionTaken:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "67130ea51bddd9886c9d4153"
 *                           action:
 *                             type: string
 *                             example: "Activar Ruta"
 *                       notes:
 *                         type: string
 *                         example: "Nuevo seguimiento prueba"
 *                       actionBy:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "670f3cad790a3f8ce0571333"
 *                           username:
 *                             type: string
 *                             example: "Martin Ortega Jaramillo"
 *                       actionDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-02T00:41:16.433Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *       404:
 *         description: Ticket no encontrado
 *       401:
 *         description: No autorizado (token no válido)
 *       500:
 *         description: Error interno del servidor
 */
historicoRouter.get('/getHistorico/:ticketId', authenticateToken, getHistoricoByTicketId);

/**
 * @swagger
 * /historico/deleteHistoricoEntry:
 *   delete:
 *     summary: Elimina una entrada del histórico
 *     tags: [Histórico]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               historicoId:
 *                 type: string
 *                 example: "66fd6b1fe1e6302bd19e082f"
 *     responses:
 *       200:
 *         description: Entrada de histórico eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Entrada de histórico eliminada"
 *                 deletedHistoricoEntry:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Registro histórico eliminado exitosamente."
 *       400:
 *         description: Falta el ID de la entrada histórica
 *       401:
 *         description: No autorizado (token no válido)
 *       404:
 *         description: Entrada de histórico no encontrada
 *       500:
 *         description: Error interno del servidor
 */
historicoRouter.delete('/deleteHistoricoEntry', authenticateToken, deleteHistoricoEntry);

module.exports = historicoRouter;
