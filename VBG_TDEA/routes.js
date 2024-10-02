const taskRouter = require('./src/ticket/routes/ticket.routing');
const userRouter  = require('./src/user/routes/user.routing');

function setRoutes(app) {
    app.use('/api/ticket', taskRouter);
    app.use('/api/user', userRouter);
 
    
}

module.exports = setRoutes;