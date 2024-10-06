const express = require('express');
const { saveUser,checkFirstLogin,updateProgram } = require('../api/user.controller');

const userRouter = express.Router();
userRouter.post('/saveUser', saveUser);
userRouter.get('/checkFirstLogin', checkFirstLogin);
userRouter.post('/updateProgram', updateProgram);

module.exports = userRouter;