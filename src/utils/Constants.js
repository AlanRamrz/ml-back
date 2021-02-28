const ROUTES = {
  HEALTH: '/healthcheck',
  CACHE: '/cache',
  TOP_SECRET: '/topsecret',
  GET_TOP_SECRET_SPLIT: '/topsecret_split',
  TOP_SECRET_SPLIT: '/topsecret_split/:satelliteName',
};

const SATELLITES = {
  KENOBI: {
    name: 'KENOBI',
    x: -500.0,
    y: -200.0,
  },
  SKYWALKER: {
    name: 'SKYWALKER',
    x: 100,
    y: -100.0,
  },
  SATO: {
    name: 'SATO',
    x: 500.0,
    y: 100.0,
  },
};

const HEADERS = {
  API_KEY: 'api-key',
  AUTHENTICATION: 'authentication',
};

module.exports = {
  ROUTES,
  SATELLITES,
  HEADERS,
};
