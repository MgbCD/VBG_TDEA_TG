const ticketRouter = require('./src/ticket/routes/ticket.routing');
const ticketStatusRouter = require('./src/ticketStatus/routes/ticketStatus.routing');
const denouncedRegisterRouter = require('./src/denouncedRegister/routes/denouncedRegister.routing');
const historicoRouter = require('./src/historico/routes/historico.routing');
const userRouter  = require('./src/user/routes/user.routing');
const ticketActionRouter = require('./src/ticketAction/routes/ticketAction.routing');
const statsRouter = require('./src/dashboard/routes/stats.routing');
const emailConfigRouter = require('./src/emailConfig/routes/emailConfig.routing');



function setRoutes(app) {

    app.use('/api/ticket', ticketRouter);

    app.use('/api/ticket-status', ticketStatusRouter);

    app.use('/api/denounced-register', denouncedRegisterRouter);

    app.use('/api/historico', historicoRouter);

    app.use('/api/user', userRouter);

    app.use('/api/ticket-action', ticketActionRouter);

    app.use('/api/dashboard', statsRouter);

    app.use('/api/email', emailConfigRouter);
}

module.exports = setRoutes;