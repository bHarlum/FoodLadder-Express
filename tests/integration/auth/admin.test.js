require('dotenv').config();
const request = require('supertest');
const app = require('./../../../app');
const testConnection = require("./../../test_db_connect");

const user = {
  email: process.env.ADMIN_USER,
  password: process.env.ADMIN_USER_PASS
}

testConnection();

describe('Log in with admin user', function() {
  it('responds with json object. Including token, ID & first name', function(done) {
    request(app)
      .post('/users/login')
      .send({ ...user })
      .expect(200, done);
  });

  it('Request with wrong username and correct password. Expect Unauthorized.', function(done) {
    request(app)
      .post('/users/login')
      .send({email: 'fakeuser@user.com', password: user.password })
      .expect(401, done);
  });

  it('Request with correct username and wrong password. Expect Unauthorized.', function(done) {
    request(app)
      .post('/users/login')
      .send({email: user.email, password: "abc123!@#" })
      .expect(401, done);
  });

  it('Request with empty object. Expect bad request', function(done) {
    request(app)
      .post('/users/login')
      .send({})
      .expect(400, done);
  });

  it('Request with only one value; email. Expect bad request', function(done) {
    request(app)
      .post('/users/login')
      .send({email: user.email})
      .expect(400, done);
  });

  it('Request with only one value; password. Expect bad request', function(done) {
    request(app)
      .post('/users/login')
      .send({email: user.email})
      .expect(400, done);
  });
});