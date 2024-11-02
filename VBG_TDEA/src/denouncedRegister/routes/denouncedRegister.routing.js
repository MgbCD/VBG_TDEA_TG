const express = require('express');
const { saveDenouncedRegister, getDenouncedRegisterByTicketId, updateDenouncedRegister, deleteDenouncedRegister } = require('../api/denouncedRegister.controller');
const authenticateToken = require('../../middleware/authMiddleware');
const denouncedRegisterRouter = express.Router();

/**
 * @swagger
 * /denounced-register/saveDenouncedRegister:
 *   post:
 *     summary: Crea un nuevo registro de denuncia
 *     tags: [Personas implicadas]
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
 *                 example: "66f9e5dabedde5696501cd02"
 *               denouncedName:
 *                 type: string
 *                 example: "John Doe"
 *               denouncedId:
 *                 type: string
 *                 example: "123456789"
 *               denouncedPhone:
 *                 type: string
 *                 example: "3134587895"
 *               denouncedEmail:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               additionalInfo:
 *                 type: string
 *                 example: "Denuncia por comportamiento inapropiado en el campus."
 *               createdBy:
 *                 type: string
 *                 example: "64b8fca4d8e4e4b8ccefae84"
 *     responses:
 *       201:
 *         description: Registro de denuncia creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 denouncedRegister:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6725752cdbaee465c4a98aa9"
 *                     ticketId:
 *                       type: string
 *                       example: "66f9e5dabedde5696501cd02"
 *                     denouncedName:
 *                       type: string
 *                       example: "John Doe"
 *                     denouncedId:
 *                       type: string
 *                       example: "123456789"
 *                     denouncedPhone:
 *                       type: string
 *                       example: "3134587895"
 *                     denouncedEmail:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     additionalInfo:
 *                       type: string
 *                       example: "Denuncia por comportamiento inapropiado en el campus."
 *                     createdBy:
 *                       type: string
 *                       example: "64b8fca4d8e4e4b8ccefae84"
 *       400:
 *         description: Solicitud incorrecta (falta un campo requerido)
 *       401:
 *         description: No autorizado (token no válido)
 *       500:
 *         description: Error interno del servidor
 */
denouncedRegisterRouter.post('/saveDenouncedRegister', authenticateToken, saveDenouncedRegister);

/**
 * @swagger
 * /denounced-register/getDenouncedRegister/{ticketId}:
 *   get:
 *     summary: Obtiene un registro de denuncia por ID de ticket
 *     tags: [Personas implicadas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: ticketId
 *         in: path
 *         required: true
 *         description: ID del ticket relacionado con la denuncia
 *         schema:
 *           type: string
 *           example: "66f9e5dabedde5696501cd02"
 *     responses:
 *       200:
 *         description: Registro de denuncia encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 denouncedRegister:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6725752cdbaee465c4a98aa9"
 *                     ticketId:
 *                       type: string
 *                       example: "66f9e5dabedde5696501cd02"
 *                     denouncedName:
 *                       type: string
 *                       example: "John Doe"
 *                     denouncedId:
 *                       type: string
 *                       example: "123456789"
 *                     denouncedPhone:
 *                       type: string
 *                       example: "3134587895"
 *                     denouncedEmail:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     additionalInfo:
 *                       type: string
 *                       example: "Denuncia por comportamiento inapropiado en el campus."
 *                     createdBy:
 *                       type: string
 *                       example: "64b8fca4d8e4e4b8ccefae84"
 *       404:
 *         description: Registro de denuncia no encontrado
 *       500:
 *         description: Error interno del servidor
 */
denouncedRegisterRouter.get('/getDenouncedRegister/:ticketId', authenticateToken, getDenouncedRegisterByTicketId);

/**
 * @swagger
 * /denounced-register/updateDenouncedRegister:
 *   put:
 *     summary: Actualiza un registro de denuncia
 *     tags: [Personas implicadas]
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
 *                 example: "66f9e5dabedde5696501cd02"
 *               denouncedData:
 *                 type: object
 *                 properties:
 *                   denouncedName:
 *                     type: string
 *                     example: "Jane Doe"
 *                   denouncedPhone:
 *                     type: string
 *                     example: "3123456789"
 *                   denouncedEmail:
 *                     type: string
 *                     example: "janedoe@example.com"
 *                   additionalInfo:
 *                     type: string
 *                     example: "Actualización de denuncia sobre comportamiento inapropiado."
 *     responses:
 *       200:
 *         description: Registro de denuncia actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 denouncedRegister:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6725752cdbaee465c4a98aa9"
 *                     ticketId:
 *                       type: string
 *                       example: "66f9e5dabedde5696501cd02"
 *                     denouncedName:
 *                       type: string
 *                       example: "Jane Doe"
 *                     denouncedPhone:
 *                       type: string
 *                       example: "3123456789"
 *                     denouncedEmail:
 *                       type: string
 *                       example: "janedoe@example.com"
 *                     additionalInfo:
 *                       type: string
 *                       example: "Actualización de denuncia sobre comportamiento inapropiado."
 *       400:
 *         description: Solicitud incorrecta (faltan datos)
 *       404:
 *         description: Registro de denuncia no encontrado
 *       500:
 *         description: Error interno del servidor
 */
denouncedRegisterRouter.put('/updateDenouncedRegister', authenticateToken, updateDenouncedRegister);

/**
 * @swagger
 * /denounced-register/deleteDenouncedRegister:
 *   delete:
 *     summary: Elimina un registro de denuncia
 *     tags: [Personas implicadas]
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
 *                 example: "66f9e5dabedde5696501cd02"
 *     responses:
 *       200:
 *         description: Registro de denuncia eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro eliminado"
 *                 deletedDenouncedRegister:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Registro de denuncia eliminado exitosamente."
 *       400:
 *         description: Solicitud incorrecta (faltan datos)
 *       404:
 *         description: Registro de denuncia no encontrado
 *       500:
 *         description: Error interno del servidor
 */
denouncedRegisterRouter.delete('/deleteDenouncedRegister', authenticateToken, deleteDenouncedRegister);

module.exports = denouncedRegisterRouter;
