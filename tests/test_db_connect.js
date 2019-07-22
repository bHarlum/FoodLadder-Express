require('dotenv').config();
const mongoose = require("mongoose");

function testConnection(){

  beforeEach(() => {
    mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    mongoose.connection.on("error", err => console.log(err));
  });

  afterEach(() => {
    mongoose.connection.close();
  });

}

module.exports = testConnection;