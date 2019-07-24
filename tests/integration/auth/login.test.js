require('dotenv').config();
const request = require('supertest');
const app = require('./../../../app');
const testConnection = require("./../../test_db_connect");
const JWTService = require("./../../../services/jwt_service");

testConnection();

describe("Login with a created user.", () => {
  it('logging in with correct credentials', (done) => {
  request(app)
    .post('/users/login')
    .send({email: 'testuser@user.com', password: "password"})
    .expect(200, done);
});

  it('logging in with incorrect credentials', (done) => {
    request(app)
      .post('/users/login')
      .send({email: 'blah@user.com', password: "password"})
      .expect(401, done);
  });
});