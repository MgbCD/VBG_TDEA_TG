const express = require('express');
const connectDB = require('./config/dataBase');
const setRoutes = require('./routes');
const dotenv = require('dotenv');
const morgan = require('morgan');
const jwtVerifyMiddleware = require('./verifyToken');
const cors = require('cors');
const { run } = require('./src/ticket/infrastructure/kafka/consumer')

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.get('/api/userinfo', jwtVerifyMiddleware, (req, res) => {
  res.redirect('/');
});


setRoutes(app);

app.listen(port, async() => {
  console.log(`app listening on port ${port}`);
  await run();
})

connectDB().catch(error => {
  console.error('Error connecting to database:', error);
});