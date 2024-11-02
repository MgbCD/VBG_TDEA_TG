const express = require('express');
const { saveTicket, updateTicket, updateTicketStatus, getTicketsByUser, deleteTicket } = require('../api/ticket.controller');
const authenticateToken = require('../../middleware/authMiddleware');
const upload = require('../../middleware/uploadMiddleware'); 
const taskRouter = express.Router();

/**
 * @swagger
 * /ticket/saveTicket:
 *   post:
 *     summary: Guarda un nuevo ticket
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Violencia en el campus"
 *               description:
 *                 type: string
 *                 example: "Se presentó un caso de violencia en..."
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Ticket guardado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9b1e8e1d88e7f1c3"
 *                     title:
 *                       type: string
 *                       example: "Violencia en el campus"
 *                     description:
 *                       type: string
 *                       example: "Se presentó un caso de violencia en..."
 *                     createdBy:
 *                       type: string
 *                       example: "60c72b2f9b1e8e1d88e7f1c4"
 *                     filePath:
 *                       type: string
 *                       example: "/uploads/tickets/file.txt"
 *       400:
 *         description: Solicitud incorrecta (por ejemplo, falta un campo requerido)
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado (token no válido)
 *       500:
 *         description: Error interno del servidor
 */
taskRouter.post('/saveTicket', authenticateToken, upload.single('file'), saveTicket); 

/**
 * @swagger
 * /ticket/updateTicket:
 *   put:
 *     summary: Actualiza un ticket existente
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: string
 *                 example: "60c72b2f9b1e8e1d88e7f1c5"
 *               title:
 *                 type: string
 *                 example: "Violencia en el campus, bloque #"
 *               description:
 *                 type: string
 *                 example: "Se presentó un caso de violencia en..., por parte de..."
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Ticket actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9b1e8e1d88e7f1c5"
 *                     title:
 *                       type: string
 *                       example: "Violencia en el campus, bloque #"
 *                     description:
 *                       type: string
 *                       example: "Se presentó un caso de violencia en..., por parte de..."
 *                     createdBy:
 *                       type: string
 *                       example: "60c72b2f9b1e8e1d88e7f1c4"
 *                     filePath:
 *                       type: string
 *                       example: "/uploads/tickets/updated_file.txt"
 *       400:
 *         description: Solicitud incorrecta (por ejemplo, falta un campo requerido)
 *       404:
 *         description: Ticket no encontrado
 *       401:
 *         description: No autorizado (token no válido)
 *       500:
 *         description: Error interno del servidor
 */
taskRouter.put('/updateTicket', authenticateToken, upload.single('file'), updateTicket);

/**
 * @swagger
 * /ticket/updateTicketStatus:
 *   put:
 *     summary: Actualiza el estado de un ticket
 *     tags: [Ticket]
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
 *                 example: "671867b458fec57825395b16"
 *               statusId:
 *                 type: string
 *                 example: "66f9ee999d07f13097358b66"
 *     responses:
 *       200:
 *         description: Estado del ticket actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "671867b458fec57825395b16"
 *                     statusId:
 *                       type: string
 *                       example: "66f9ee999d07f13097358b66"
 *       400:
 *         description: Solicitud incorrecta (por ejemplo, falta un campo requerido)
 *       403:
 *         description: Solo los administradores pueden cambiar el estado del ticket
 *       404:
 *         description: Ticket no encontrado
 *       401:
 *         description: No autorizado (token no válido)
 *       500:
 *         description: Error interno del servidor
 */
taskRouter.put('/updateTicketStatus', authenticateToken, updateTicketStatus);

/**
 * @swagger
 * /ticket/my-tickets:
 *   get:
 *     summary: Obtiene los tickets del usuario autenticado
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tickets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6723d803dba4ca86c8168b2a"
 *                       title:
 *                         type: string
 *                         example: "Reportar acoso en el campus"
 *                       description:
 *                         type: string
 *                         example: "He sido víctima de acoso por parte de un compañero en la facultad y necesito ayuda."
 *                       createdBy:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "670f52219d26f4935655e0a1"
 *                           username:
 *                             type: string
 *                             example: "Ana Rodríguez"
 *                       statusId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6707e3f50665ce0ab8baaac1"
 *                           status:
 *                             type: string
 *                             example: "En revisión"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-30T12:34:56.789Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-30T14:00:00.000Z"
 *                       adminId:
 *                         type: string
 *                         example: "670f3cad790a3f8ce0571333"
 *                       filePath:
 *                         type: string
 *                         example: null
 *                       __v:
 *                         type: integer
 *                         example: 0
 *       401:
 *         description: No autorizado (token no válido)
 *       500:
 *         description: Error interno del servidor
 */
taskRouter.get('/my-tickets', authenticateToken, getTicketsByUser);

/**
 * @swagger
 * /ticket/deleteTicket:
 *   delete:
 *     summary: Elimina un ticket existente
 *     tags: [Ticket]
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
 *     responses:
 *       200:
 *         description: Ticket eliminado exitosamente
 *       400:
 *         description: Solicitud incorrecta (por ejemplo, falta el ID del ticket)
 *       404:
 *         description: Ticket no encontrado
 *       401:
 *         description: No autorizado (token no válido)
 *       500:
 *         description: Error interno del servidor
 */
taskRouter.delete('/deleteTicket', authenticateToken, deleteTicket);

module.exports = taskRouter;