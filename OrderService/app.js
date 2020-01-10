const createError = require('http-errors');
const express = require('express');
const logger = require('./logger');
var path = require('path');
const orderRoutes = require("./routes/order");
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const morgan = require('morgan');
const authentic = require('./services/authorization');
const route = express.Router();

// ============================= views
var app = express();
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');
// ============================== mongo connection

const DB_IP_ADDRESS = process.env.DB_IP_ADDRESS || '127.0.0.1'
const url = `mongodb://${DB_IP_ADDRESS}:27017/node`

const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then((db)=>{
  logger.info('Successfully connected to db')
},(error)=>{
  logger.error('Unable to connect the DB', error);
});

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ============================= routers: =============================
app.post('/authenticate', authentic.setToken);
app.use('/api', route);
app.use("/", orderRoutes);


// ============================= error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
