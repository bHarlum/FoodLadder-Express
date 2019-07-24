require('dotenv').config();
const request = require('supertest');
const app = require('./../../../app');
const testConnection = require("./../../test_db_connect");

testConnection();

describe('GET /', () => {
  it('testing root route', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('testing root route with data', (done) => {
    request(app)
      .get('/')
      .send({testing: "testing"})
      .expect(200, done);
  });
});
