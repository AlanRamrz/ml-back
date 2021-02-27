const assert = require('assert');

const {
  PORT,
  WOLFRAM_ID,
  APP_NAME,
} = process.env;

assert(PORT, 'PORT must be provided');
assert(WOLFRAM_ID, 'WOLFRAM_ID must be provided');
assert(APP_NAME, 'APP_NAME must be provided');

module.exports = {
  PORT,
  WOLFRAM_ID,
  APP_NAME,
};
