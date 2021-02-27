const TopSecretService = module.exports;
const BaseError = require('../utils/BaseError');
const { SATELLITES } = require('../utils/Constants');
const WolframClient = require('../clients/WolframClient');
const EquationMapper = require('../mappers/EquationMapper');

const logger = console.log;

let CACHE = {};

TopSecretService.getCache = () => CACHE;

TopSecretService.deleteCache = () => {
  CACHE = {};
};

const getMessage = (kenobiMessage, skywalkerMessage, satoMessage) => {
  try {
    let messages = [kenobiMessage, skywalkerMessage, satoMessage];
    const minLength = Math.min(...messages.map((it) => it.length));
    messages = messages.map((it) => {
      it.splice(0, it.length - minLength);
      return it;
    });

    const [sanitizedKenobi, sanitizedSkywalker, sanitizedSato] = messages;
    const res = [];
    for (let i = 0; i < minLength; i++) {
      res[i] = sanitizedKenobi[i] || sanitizedSkywalker[i] || sanitizedSato[i];
    }

    return res.join(' ');
  } catch (error) {
    logger(`[ERROR] at getMessage -> ${error}`);

    return '';
  }
};

const getLocation = async (kenobiDistance, skywalkerDistance, satoDistance) => {
  try {
    const { KENOBI, SKYWALKER, SATO } = SATELLITES;
    const equations = [
      EquationMapper.mapPointDistance(KENOBI, kenobiDistance),
      EquationMapper.mapPointDistance(SKYWALKER, skywalkerDistance),
      EquationMapper.mapPointDistance(SATO, satoDistance),
    ];

    logger('Start Wolfram Request...');
    const wolframRes = await WolframClient.fullResult(equations.join(','));
    logger(`Wolfram response -> ${JSON.stringify(wolframRes)}`);

    const { pods = [] } = wolframRes;
    const solutionPod = pods.find((it) => it.id === 'IntegerSolution') || {};
    const { subpods = [] } = solutionPod;
    const solutions = subpods.map((it) => it.plaintext);

    return solutions;
  } catch (error) {
    logger(`[ERROR] at getLocation -> ${error}`);

    return [];
  }
};

TopSecretService.getTopSecretSplit = async () => {
  const { KENOBI_DATA, SKYWALKER_DATA, SATO_DATA } = CACHE;
  if (!KENOBI_DATA || !SKYWALKER_DATA || !SATO_DATA) {
    throw new BaseError('Missing data from Kenobi, Skywalker or Sato', 'NotFoundMessage', 404);
  }

  logger(`TopSecretService.getTopSecretSplit for CACHE data -> ${JSON.stringify(CACHE)}`);
  const message = getMessage(KENOBI_DATA.message, SKYWALKER_DATA.message, SATO_DATA.message);
  const position = await getLocation(KENOBI_DATA.distance, SKYWALKER_DATA.distance, SATO_DATA.distance);

  return { message, position };
};

TopSecretService.topSecret = (kenobi, skywalker, sato) => {
  logger(`TopSecretService.topSecret with satellites ${JSON.stringify({ kenobi, skywalker, sato })}`);
  CACHE.KENOBI_DATA = kenobi;
  CACHE.SKYWALKER_DATA = skywalker;
  CACHE.SATO_DATA = sato;

  return TopSecretService.getTopSecretSplit();
};
