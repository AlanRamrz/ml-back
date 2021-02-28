const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const { topSecretSchema, topSecretSplitSchema } = require('./schemas/TopSecretSchemas');
const TopSecretController = require('./controllers/TopSecretController');
const Auth = require('./utils/Auth');

const { ROUTES } = require('./utils/Constants');

const router = express.Router();
router.get(ROUTES.HEALTH, (req, res) => res.send({ status: 'OK' }));

// CACHE ROUTES
router.get(ROUTES.CACHE, Auth, TopSecretController.getCache);
router.delete(ROUTES.CACHE, Auth, TopSecretController.deleteCache);

// TOP SECRET ROUTES
router.get(
  ROUTES.GET_TOP_SECRET_SPLIT,
  Auth,
  TopSecretController.getTopSecretSplit,
);
router.post(
  ROUTES.TOP_SECRET_SPLIT,
  Auth,
  validator.body(topSecretSplitSchema, { passError: true }),
  TopSecretController.topSecretSplit,
);
router.post(
  ROUTES.TOP_SECRET,
  Auth,
  validator.body(topSecretSchema, { passError: true }),
  TopSecretController.topSecret,
);

module.exports = router;
