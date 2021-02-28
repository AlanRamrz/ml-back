const { APP_API_KEY, APP_AUTHENTICATION } = require('../config');
const { HEADERS } = require('./Constants');

const { API_KEY, AUTHENTICATION } = HEADERS;

module.exports = (req, res, next) => {
  const { headers } = req;
  const apiKeyValue = headers[API_KEY] || '';
  const authenticationValue = headers[AUTHENTICATION] || '';
  if (apiKeyValue !== APP_API_KEY || authenticationValue !== APP_AUTHENTICATION) {
    return res.status(401).send({ code: 'InvalidCredentials', message: 'Invalid credentials' });
  }

  return next();
};
