const TopSecretService = module.exports;
const BaseError = require('../utils/BaseError');

const logger = console.log;

let CACHE = {};

TopSecretService.getCache = () => CACHE;

TopSecretService.deleteCache = () => {
  CACHE = {};
};

const getMessage = () => {
  const { KENOBI, SKYWALKER, SATO } = CACHE;
  if (!KENOBI || !SKYWALKER || !SATO) {
    throw new BaseError('Missing data from Kenobi, Skywalker or Sato', 'NotFoundMessage', 404);
  }

  let messages = [KENOBI.message, SKYWALKER.message, SATO.message];
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
};

TopSecretService.topSecret = (kenobi, skywalker, sato) => {
  logger(`TopSecretService.topSecret with satellites ${JSON.stringify({ kenobi, skywalker, sato })}`);
  CACHE.KENOBI = kenobi;
  CACHE.SKYWALKER = skywalker;
  CACHE.SATO = sato;

  return {
    message: getMessage(),
  };
};
