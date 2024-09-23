const taskRouter = require('./src/ticket/routes/ticket.routing');

function setRoutes(app) {
    app.use('/api/ticket', taskRouter);
 
    
}

module.exports = setRoutes;