require('../index');
const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');

const { PORT, APP_NAME } = require('../src/config');
const { ROUTES } = require('../src/utils/Constants');

const { describe, it } = mocha;
const { expect } = chai;

chai.use(chaiHttp);
const url = `http://localhost:${PORT}/api/${APP_NAME}`;

describe('Healthcheck: ', () => {
  it('Should return 200 OK: ', (done) => {
    chai.request(url)
      .get(`/${ROUTES.HEALTH}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
