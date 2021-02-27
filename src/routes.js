const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const { topSecretSchema } = require('./schemas/TopSecretSchemas');
const TopSecretController = require('./controllers/TopSecretController');

const { ROUTES } = require('./utils/Constants');

const router = express.Router();
router.get(ROUTES.HEALTH, (req, res) => res.send({ status: 'OK' }));

router.get(ROUTES.CACHE, TopSecretController.getCache);
router.delete(ROUTES.CACHE, TopSecretController.deleteCache);

router.post(
  ROUTES.TOP_SECRET,
  validator.body(topSecretSchema, { passError: true }),
  TopSecretController.topSecret,
);

module.exports = router;
