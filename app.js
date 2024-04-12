var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();



var indexRouter = require('./routes/index');

var app = express();


const MONGODB_URI = process.env.MONGODBURIContent;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));



const store = new MongoDBStore({
  uri: process.env.MONGODBURISessionDB,
  collection: 'sessions'
});
app.use(session({
  secret: '08fca2c1-55a8-4d2a-ba0b-e0ab163b1ac1',
  resave: false,
  saveUninitialized: false,
  store: store
}));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);









module.exports = app;
