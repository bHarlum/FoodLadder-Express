const request = require('supertest');
const connection = require("./../../test_db_connect");
const app = require("./../../../app");

connection();

describe('Testing the root path', () => {
  test('GET - should return success.', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
    });
});

