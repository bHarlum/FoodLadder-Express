require('dotenv').config();
const request = require('supertest');
const app = require('./../../../app');
const mongoose = require('mongoose');

beforeEach(() => {
  mongoose.connect(process.env.DB_HOST_TEST, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", err => console.log(err));
});

afterEach(() => {
  mongoose.connection.close();
});