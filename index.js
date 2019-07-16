require('dotenv').config();
require('./database/connect');
const passport = require('passport');
const app = require('./app');

global.HTTPError = class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
    this.name = 'HTTPError';
    this.statusCode = statusCode;
  }
};

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
