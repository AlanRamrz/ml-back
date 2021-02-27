const Joi = require('joi');

const topSecretSchema = Joi.object().keys({
  satellites: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    distance: Joi.number().min(0).required(),
    message: Joi.array().items(Joi.string().allow('').required()).required(),
  })).required(),
});

const topSecretSplitSchema = Joi.object().keys({
  distance: Joi.number().min(0).required(),
  message: Joi.array().items(Joi.string().allow('').required()).required(),
});

module.exports = {
  topSecretSchema,
  topSecretSplitSchema,
};
