const express = require('express');
const { saveUser, checkFirstLogin, updateProgram, getUserByEmail, getRoleByEmail } = require('../api/user.controller');

const userRouter = express.Router();
userRouter.post('/saveUser', saveUser);
userRouter.get('/checkFirstLogin', checkFirstLogin);
userRouter.post('/updateProgram', updateProgram);
userRouter.get('/getUser', getUserByEmail);
userRouter.get('/getRole', getRoleByEmail);

module.exports = userRouter;