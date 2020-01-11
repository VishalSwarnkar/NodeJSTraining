const createError = require('http-errors');
const express = require('express');
const logger = require('./logger');
var path = require('path');
const restaurant = require('./routes/restaurant/');
require('dotenv').config();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const authentic = require('./Services/authorization');

const app = express();
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');
// ============================= Mongoo DB: =============================

const DB_IP_ADDRESS = process.env.DB_IP_ADDRESS || '127.0.0.1'
const url = `mongodb://${DB_IP_ADDRESS}:27017/node`

const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then((db)=>{
  logger.info('Successfully connected to db')
},(error)=>{
  logger.error('Unable to connect the DB', error);
});

// ======================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ============================= routers: =============================
app.post('/authenticate', authentic.setToken);
app.use("/", restaurant);

module.exports = app;
