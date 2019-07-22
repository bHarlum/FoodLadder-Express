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

describe('GET /', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .set('Remote-Addr', 'http://localhost:3000')
      .expect(200, done);
  });
});

// describe('GET /', function() {
//   it('responds with 200', function(done) {
//     supertest(app)
//       .get('/')
//       .expect(200, done);
//   });
// });