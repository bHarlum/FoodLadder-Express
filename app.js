const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require("cors");
const passport = require("./config/passport");
const session = require('express-session');

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false
}));

app.use(morgan('combined'));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

app.use(express.static('public'));

app.use(require('./middleware/error_handler_middleware'));

require('./database/connect');

module.exports = app;
