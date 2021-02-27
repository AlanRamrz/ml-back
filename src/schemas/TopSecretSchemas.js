const Joi = require('joi');

const topSecretSchema = Joi.object().keys({
  satellites: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    message: Joi.array().items(Joi.string().allow('').required()).required(),
  })).required(),
});

module.exports = { topSecretSchema };
