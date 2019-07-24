require('dotenv').config();
const request = require('supertest');
const app = require('./../../../app');
const testConnection = require("./../../test_db_connect");
const JWTService = require("./../../../services/jwt_service");

testConnection();

//const token = JWTService.generateToken(user._id);

describe('Testing register route ', () => {
  it('Empty request, expect bad request.', (done) => {
    request(app)
      .post('/users/register')
      .send({})
      .expect(400, done);
  });

  it('Request with correct data.', (done) => {
    request(app)
      .post('/users/register')
      .send({})
      .expect(400, done);
  });
});
