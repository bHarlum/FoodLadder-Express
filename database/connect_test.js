require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST_TEST, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.log);
