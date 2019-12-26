var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config();
const logger = require('./logger');
const bodyParser = require('body-parser')

const orderRoutes = require("./routes/order");

// ============================= views
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// ============================== mongo connection
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const DB_IP_ADDRESS = process.env.DB_IP_ADDRESS || '127.0.0.1'
const url = `mongodb://${DB_IP_ADDRESS}:27017/node`

const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db)=>{
  logger.info('Successfully connected to db')
},(error)=>{
  logger.error('Unable to connect the DB', error);
});

// ======================================
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ============================= routers: =============================
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
