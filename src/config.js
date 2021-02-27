const assert = require('assert');

const {
  PORT,
} = process.env;

assert(PORT, 'PORT must be provided');

module.exports = { PORT };
