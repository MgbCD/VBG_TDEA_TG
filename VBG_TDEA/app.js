const express = require('express');
const connectDB = require('./config/dataBase');
const setRoutes = require('./routes');
const dotenv = require('dotenv');
const morgan = require('morgan');
const jwtVerifyMiddleware = require('./verifyToken');
const cors = require('cors');
const { run } = require('./src/ticket/infrastructure/kafka/consumer');
const {connectProducer, disconnectProducer} = require('./src/ticket/infrastructure/kafka/producer');
const setupSwagger = require('./swagger');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: [process.env.FRONTEND_URL], 
    credentials: true,
  }));

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

setupSwagger(app);

app.get('/api/userinfo', jwtVerifyMiddleware, (req, res) => {
  res.redirect('/');
});
setRoutes(app);

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Iniciar el producer de Kafka y el consumer
    await connectProducer();
    console.log('Productor conectado a Kafka');
    await run();

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1); // Salir si hay un error crítico
  }
};

// Manejar la desconexión de recursos al finalizar
process.on('SIGINT', async () => {
  console.log('Cerrando la aplicación...');
  await disconnectProducer();
  process.exit(0);
});

startServer();