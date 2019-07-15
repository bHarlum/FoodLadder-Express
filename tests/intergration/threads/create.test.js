const supertest = require("supertest");
const app = require("./../../../app");
const mongoose = require("mongoose");


beforeAll(() => {
  mongoose.connect(process.env.DB_HOST_TEST, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", err => console.log(err));
});

afterAll(() => {
  mongoose.connection.close();
});

describe("Creating a new Thread", () => {
  test("POST /threads with valid req body", async () => {
    const response = await supertest(app)
      .post("/threads")
      .send({
        title: `test-thread ${Math.random()}`
    })
    // .expect(302);
    expect(response.body).toEqual({});
    expect(response.header.location).toMatch(/^\/threads\/.*$/);
  });
});

