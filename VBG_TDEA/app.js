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
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: [process.env.FRONTEND_URL], 
    credentials: true,
  }));

app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

setupSwagger(app);

app.get('/api/userinfo', jwtVerifyMiddleware, (req, res) => {
  res.redirect('/');
});
setRoutes(app);

const startServer = async () => {
  try {
    await connectDB();
    await connectProducer();
    await run();
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  await disconnectProducer();
  process.exit(0);
});

startServer();