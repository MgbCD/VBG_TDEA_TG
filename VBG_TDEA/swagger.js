const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API for your project',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
            },
        },
    },
    apis: ['./src/user/routes/user.routing.js', './src/ticket/routes/ticket.routing.js', './src/historico/routes/historico.routing.js', './src/denouncedRegister/routes/denouncedRegister.routing.js', './src/dashboard/routes/stats.routing.js', './src/ticketStatus/routes/ticketStatus.routing.js', './src/ticketAction/routes/ticketAction.routing.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
