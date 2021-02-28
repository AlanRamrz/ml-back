module.exports = {
  TOP_SECRET_SPLIT_SATELLITE_NAME: 'Alan',
  TOP_SECRET_SPLIT_VALID_BODY: {
    message: ['this', 'is', 'a', 'test'],
    distance: 100.0,
  },
  TOP_SECRET_SPLIT_VALID_RESPONSE: {
    ALAN_DATA: {
      message: ['this', 'is', 'a', 'test'],
      distance: 100.0,
    },
  },
  TOP_SECRET_SPLIT_INVALID_BODY: {
    distance: 100.0,
  },
  TOP_SECRET_VALID_BODY: {
    satellites: [
      {
        name: 'kenobi',
        distance: 100.0,
        message: ['este', '', '', 'mensaje', '', '', ''],
      },
      {
        name: 'SKYWALKER',
        distance: 115.5,
        message: ['', '', '', 'es', '', '', 'secreto', '', 'alan'],
      },
      {
        name: 'SATO',
        distance: 142.7,
        message: ['', 'este', '', 'un', '', '', 'de', ''],
      },
    ],
  },
  TOP_SECRET_INVALID_BODY: {},
  TOP_SECRET_VALID_RESPONSE: {
    message: 'este es un mensaje secreto de alan',
    position: ['x = 2, y = 3'],
  },
  MOCK_WOLFRAM_RES: {
    pods: [
      {
        id: 'IntegerSolution',
        subpods: [
          { plaintext: 'x = 2, y = 3' },
        ],
      },
    ],
  },
};
