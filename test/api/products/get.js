process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app/routes/note.routes.js');
const conn = require('../../../server.js');

describe('GET /products', () => {
    before((done) => {
      conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    })
  
    after((done) => {
      conn.close()
        .then(() => done())
        .catch((err) => done(err));
    })
  
    it('OK, getting products has no products', (done) => {
      request(app).get('/products')
        .then((res) => {
          const body = res.body;
          expect(body.length).to.equal(0);
          done();
        })
        .catch((err) => done(err));
    });
  })