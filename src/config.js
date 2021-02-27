const assert = require('assert');

const {
  PORT,
  WOLFRAM_ID,
} = process.env;

assert(PORT, 'PORT must be provided');
assert(WOLFRAM_ID, 'WOLFRAM_ID must be provided');

module.exports = {
  PORT,
  WOLFRAM_ID,
};
