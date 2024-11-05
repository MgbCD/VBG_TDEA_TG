const express = require('express');
const connectDB = require('./config/dataBase');
const setRoutes = require('./routes');
const dotenv = require('dotenv');
const morgan = require('morgan');
const jwtVerifyMiddleware = require('./verifyToken');
const cors = require('cors');
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

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

connectDB().catch(error => {
    console.error('Error connecting to database:', error);
});