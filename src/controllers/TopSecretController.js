const TopSecretController = module.exports;
const BaseError = require('../utils/BaseError');
const { SATELLITES } = require('../utils/Constants');
const TopSecretService = require('../services/TopSecretService');

const logger = console.log;

TopSecretController.getCache = (req, res) => res.send(TopSecretService.getCache());
TopSecretController.deleteCache = (req, res) => res.status(204).send(TopSecretService.deleteCache());

TopSecretController.getTopSecretSplit = async (req, res, next) => {
  try {
    logger('TopSecretController.getTopSecretSplit');
    const data = await TopSecretService.getTopSecretSplit();

    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

TopSecretController.topSecretSplit = (req, res, next) => {
  try {
    const { params, body } = req;
    const { satelliteName } = params;
    logger(`TopSecretController.topSecretSplit with satellite ${satelliteName} and body ${JSON.stringify(body)}`);

    const data = TopSecretService.topSecretSplit(satelliteName.toUpperCase(), body);

    return res.status(201).send(data);
  } catch (error) {
    return next(error);
  }
};

TopSecretController.topSecret = async (req, res, next) => {
  try {
    const { satellites: satellitesInput } = req.body;
    logger(`TopSecretController.topSecret with satellites ${JSON.stringify(satellitesInput)}`);

    const kenobi = satellitesInput.find((it) => it.name.toUpperCase() === SATELLITES.KENOBI.name);
    const skywa = satellitesInput.find((it) => it.name.toUpperCase() === SATELLITES.SKYWALKER.name);
    const sato = satellitesInput.find((it) => it.name.toUpperCase() === SATELLITES.SATO.name);
    if (!kenobi || !skywa || !sato) {
      throw new BaseError('Missing data from Kenobi, Skywalker or Sato', 'NotFoundMessage', 404);
    }

    const data = await TopSecretService.topSecret(kenobi, skywa, sato);

    return res.send(data);
  } catch (error) {
    return next(error);
  }
};
