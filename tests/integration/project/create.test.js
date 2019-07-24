require('dotenv').config();
const request = require('supertest');
const app = require('./../../../app');
const JWTService = require("./../../../services/jwt_service");
const testConnection = require("./../../test_db_connect");
const userController = require("./../../../controllers/user_controller");

testConnection();

const user = {
  email: process.env.ADMIN_USER,
  password: process.env.ADMIN_USER_PASS
}

let token = undefined;

beforeAll(() => {
  return request(app)
    .post('/users/login')
    .send({ ...user })
    .then(response => {
      data = JSON.parse(response.res.text);
      return token = data.token;
    });
});

const newProject = {
    name: 'Test-suite-project-name',
    userName: 'Test-suite-username',
    address: {
      line1: "test address, test street",
      line2: "test-apartment 2",
      postcode: "1234",
      state: "NSW",
      country: "test-country",
      city: "test-city"
    },
    users: [{email: `${Date.now()}@tester.com`, }]
  }

describe("Testing Project creation", () => {
  console.log(token, "2222");
  it("Creating with correct data", (done) => {
    request(app).post('/projects')
    .set('authorization', `Bearer ${token}`)
    .send({
      newProject
    })
    .expect(200, done);
  });
});