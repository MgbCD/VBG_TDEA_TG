const ticketRouter = require('./src/ticket/routes/ticket.routing');
const ticketStatusRouter = require('./src/ticketStatus/routes/ticketStatus.routing');
const denouncedRegisterRouter = require('./src/denouncedRegister/routes/denouncedRegister.routing');
const historicoRouter = require('./src/historico/routes/historico.routing');
const userRouter  = require('./src/user/routes/user.routing');
const ticketActionRouter = require('./src/ticketAction/routes/ticketAction.routing');


function setRoutes(app) {

    app.use('/api/ticket', ticketRouter);

    app.use('/api/ticket-status', ticketStatusRouter);

    app.use('/api/denounced-register', denouncedRegisterRouter);

    app.use('/api/historico', historicoRouter);

    app.use('/api/user', userRouter);

    app.use('/api/ticket-action', ticketActionRouter);
}

module.exports = setRoutes;