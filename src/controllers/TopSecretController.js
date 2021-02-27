const TopSecretController = module.exports;
const BaseError = require('../utils/BaseError');
const { SATELLITES } = require('../utils/Constants');
const TopSecretService = require('../services/TopSecretService');

const logger = console.log;

TopSecretController.getCache = async (req, res) => res.send(TopSecretService.getCache());
TopSecretController.deleteCache = async (req, res) => res.status(204).send(TopSecretService.deleteCache());

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
