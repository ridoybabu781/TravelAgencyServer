const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);

const addBookingSchema = Joi.object({
  tourName: Joi.string().required(),
  tourLocation: Joi.string().required(),
  numberOfTraveler: Joi.number().default(1),
  tourDate: Joi.date().required(),
  paymentMethod: Joi.string().valid("COD", "SSLCommerz").required(),
  status: Joi.string()
    .valid("Pending", "Confirmed", "Cancelled")
    .default("Pending"),
  paymentStatus: Joi.string()
    .valid("Pending", "Paid", "Failed")
    .default("Pending"),
  totalPrice: Joi.number().required(),
});

module.exports = {
  addBookingSchema,
};
