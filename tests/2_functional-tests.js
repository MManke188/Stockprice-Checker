const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // #1
  test("Viewing one stock" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=goog')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.isObject(res.body.stockData)
        assert.equal(res.body.stockData.stock, 'GOOG')
        done();
      })
  });
  // #2
  test("Viewing one stock and liking it" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=gme&like=true')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isAtLeast(res.body.stockData.likes, 1)
        done();
      })
  });
  // #3
  test("Viewing the same stock and liking it again" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=gme&like=true')
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  // #4
  test("Viewing two stocks" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=goog&stock=gme')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.isArray(res.body.stockData)
        done();
      })
  });
  // #5
  test("Viewing two stocks and liking them" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=goog&stock=gme&like=true')
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  
});
