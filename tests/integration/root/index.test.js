require('dotenv').config();
const request = require('supertest');
const app = require('./../../../app');
const testConnection = require("./../../test_db_connect");

testConnection();

describe('GET /', function() {
  it('testing root route', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
