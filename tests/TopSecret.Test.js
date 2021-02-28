require('../index');
const chai = require('chai');
const mocha = require('mocha');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const WolframClient = require('../src/clients/WolframClient');

const {
  PORT,
  APP_NAME,
  APP_API_KEY,
  APP_AUTHENTICATION,
} = require('../src/config');

const { ROUTES, HEADERS } = require('../src/utils/Constants');

const {
  TOP_SECRET_SPLIT_SATELLITE_NAME,
  TOP_SECRET_SPLIT_VALID_BODY,
  TOP_SECRET_SPLIT_VALID_RESPONSE,
  TOP_SECRET_SPLIT_INVALID_BODY,
  TOP_SECRET_VALID_BODY,
  TOP_SECRET_VALID_RESPONSE,
  TOP_SECRET_INVALID_BODY,
  MOCK_WOLFRAM_RES,
} = require('./models/TopSecretModels');

const {
  describe,
  it,
  beforeEach,
  afterEach,
} = mocha;

const { expect } = chai;
const sandbox = sinon.createSandbox();

chai.use(chaiHttp);
const url = `http://localhost:${PORT}/api/${APP_NAME}`;

describe('GET CACHE: ', () => {
  it('Should return 401 for invalid credentials: ', (done) => {
    chai.request(url)
      .get(`/${ROUTES.CACHE}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('Should return 200 OK when valid credentials: ', (done) => {
    chai.request(url)
      .get(`/${ROUTES.CACHE}`)
      .set(HEADERS.API_KEY, APP_API_KEY)
      .set(HEADERS.AUTHENTICATION, APP_AUTHENTICATION)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('DELETE CACHE: ', () => {
  it('Should return 401 for invalid credentials: ', (done) => {
    chai.request(url)
      .delete(`/${ROUTES.CACHE}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('Should return 204 NO CONTENT when valid credentials: ', (done) => {
    chai.request(url)
      .delete(`/${ROUTES.CACHE}`)
      .set(HEADERS.API_KEY, APP_API_KEY)
      .set(HEADERS.AUTHENTICATION, APP_AUTHENTICATION)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});

describe('GET TOP SECRET SPLIT: ', () => {
  it('Should return 401 for invalid credentials: ', (done) => {
    chai.request(url)
      .get(`/${ROUTES.GET_TOP_SECRET_SPLIT}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('Should return 404 because not enough data: ', (done) => {
    chai.request(url)
      .get(`/${ROUTES.GET_TOP_SECRET_SPLIT}`)
      .set(HEADERS.API_KEY, APP_API_KEY)
      .set(HEADERS.AUTHENTICATION, APP_AUTHENTICATION)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('POST TOP SECRET SPLIT: ', () => {
  it('Should return 401 for invalid credentials: ', (done) => {
    chai.request(url)
      .post(`/${ROUTES.GET_TOP_SECRET_SPLIT}/${TOP_SECRET_SPLIT_SATELLITE_NAME}`)
      .send(TOP_SECRET_SPLIT_VALID_BODY)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('Should return 400 because invalid input: ', (done) => {
    chai.request(url)
      .post(`/${ROUTES.GET_TOP_SECRET_SPLIT}/${TOP_SECRET_SPLIT_SATELLITE_NAME}`)
      .set(HEADERS.API_KEY, APP_API_KEY)
      .set(HEADERS.AUTHENTICATION, APP_AUTHENTICATION)
      .send(TOP_SECRET_SPLIT_INVALID_BODY)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should return 201  whwn valid input and credentials: ', (done) => {
    chai.request(url)
      .post(`/${ROUTES.GET_TOP_SECRET_SPLIT}/${TOP_SECRET_SPLIT_SATELLITE_NAME}`)
      .set(HEADERS.API_KEY, APP_API_KEY)
      .set(HEADERS.AUTHENTICATION, APP_AUTHENTICATION)
      .send(TOP_SECRET_SPLIT_VALID_BODY)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.deep.equal(TOP_SECRET_SPLIT_VALID_RESPONSE);
        done();
      });
  });
});

describe('TOP SECRET: ', () => {
  beforeEach(() => {
    sandbox.stub(WolframClient, 'fullResult').returns(MOCK_WOLFRAM_RES);
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('Should return 401 for invalid credentials: ', (done) => {
    chai.request(url)
      .post(`/${ROUTES.TOP_SECRET}`)
      .send(TOP_SECRET_VALID_BODY)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('Should return 400 for invalid body: ', (done) => {
    chai.request(url)
      .post(`/${ROUTES.TOP_SECRET}`)
      .set(HEADERS.API_KEY, APP_API_KEY)
      .set(HEADERS.AUTHENTICATION, APP_AUTHENTICATION)
      .send(TOP_SECRET_INVALID_BODY)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Should return 200 when valid body and credentials: ', (done) => {
    chai.request(url)
      .post(`/${ROUTES.TOP_SECRET}`)
      .set(HEADERS.API_KEY, APP_API_KEY)
      .set(HEADERS.AUTHENTICATION, APP_AUTHENTICATION)
      .send(TOP_SECRET_VALID_BODY)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.deep.equal(TOP_SECRET_VALID_RESPONSE);
        done();
      });
  });
});
