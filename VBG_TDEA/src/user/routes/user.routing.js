const express = require('express');
const { saveUser, checkFirstLogin, updateProgram, getUserByEmail, getRoleByEmail } = require('../api/user.controller');
const authenticateToken = require('../../middleware/authMiddleware');
const userRouter = express.Router();

/**
 * @swagger
 * /user/saveUser:
 *   post:
 *     summary: Crea o actualiza un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identityId:
 *                 type: string
 *                 example: "123456789"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               username:
 *                 type: string
 *                 example: "John Doe"
 *               roleId:
 *                 type: string
 *                 example: "student"
 *               program:
 *                 type: string
 *                 example: "Ingeniería"
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario creado correctamente"
 *                 user:
 *                   type: object
 *                   additionalProperties: true
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado correctamente"
 *                 user:
 *                   type: object
 *                   additionalProperties: true
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error interno del servidor
 */
userRouter.post('/saveUser', authenticateToken, saveUser);

/**
 * @swagger
 * /user/checkFirstLogin:
 *   get:
 *     summary: Verifica si es el primer inicio de sesión del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: Indica si es el primer inicio de sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstLogin:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
userRouter.get('/checkFirstLogin', authenticateToken, checkFirstLogin);

/**
 * @swagger
 * /user/updateProgram:
 *   post:
 *     summary: Actualiza el programa del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               program:
 *                 type: string
 *                 example: "Ingeniería de Sistemas"
 *     responses:
 *       200:
 *         description: Programa actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Programa actualizado correctamente"
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     program:
 *                       type: string
 *                       example: "Ingeniería de Sistemas"
 *       400:
 *         description: Faltan campos requeridos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
userRouter.post('/updateProgram', authenticateToken, updateProgram);

/**
 * @swagger
 * /user/getUser:
 *   get:
 *     summary: Obtiene información del usuario por correo electrónico
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: Información del usuario encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "670f52219d26f4935655e0a1"
 *                 identityId:
 *                   type: string
 *                   example: "123456789"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 username:
 *                   type: string
 *                   example: "John Doe"
 *                 roleId:
 *                   type: string
 *                   example: "student"
 *                 program:
 *                   type: string
 *                   example: "Ingeniería de Sistemas"
 *       400:
 *         description: Falta el campo email
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
userRouter.get('/getUser', authenticateToken, getUserByEmail);

/**
 * @swagger
 * /user/getRole:
 *   get:
 *     summary: Obtiene el rol del usuario por correo electrónico
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: Rol del usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roleId:
 *                   type: string
 *                   example: "student"
 *       400:
 *         description: Falta el campo email
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
userRouter.get('/getRole', authenticateToken, getRoleByEmail);

module.exports = userRouter;