const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const addTravelSchema = Joi.object({
  travelType: Joi.string().default("Tavel"),
  title: Joi.string().required().min(5).max(100).trim(),
  description: Joi.string().required().min(20).trim(),
  price: Joi.number().required().min(0),
  location: Joi.string().trim().required(),
  duration: Joi.number().required().min(1),
  categories: Joi.array().items(Joi.string()),
  email: Joi.string(),
  number: Joi.number(),
  contactAddress: Joi.string(),
});

module.exports = { addTravelSchema };
