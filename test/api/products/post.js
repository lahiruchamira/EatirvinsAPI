process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app/routes/note.routes.js');
const conn = require('../../../server.js');

describe('POST /products', () => {
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
    it('OK, creating a new product works', (done) => {
        request(app).post('/products')
          .send({ name: 'product', price: 123 })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('price');
            done();
          })
          .catch(done);
      });
      it('Fail, note requires text', (done) => {
        request(app).post('/notes')
          .send({ name: 'product' })
          .then((res) => {
            const body = res.body;
            expect(body.errors.text.name)
              .to.equal('ValidatorError')
            done();
          })
          .catch((err) => done(err));
      });
})