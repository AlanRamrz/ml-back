const WolframClient = module.exports;

const wolframAlphaAPI = require('wolfram-alpha-api');
const { WOLFRAM_ID } = require('../config');

const api = wolframAlphaAPI(WOLFRAM_ID);

WolframClient.fullResult = (input) => api.getFull(input);
