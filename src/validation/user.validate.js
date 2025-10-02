const Joi = require("joi");

// Create validation schema
const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  verificationCode: Joi.number().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("traveler", "agency", "admin").default("traveler"),
  isAgent: Joi.string().valid("no", "pending", "yes").default("no"),
  profilePic: Joi.string().uri().optional(),
  coverPic: Joi.string().uri().optional(),

  // Shared
  bio: Joi.string().optional(),
  address: Joi.string().optional(),
  age: Joi.number().optional(),
  birthDate: Joi.date().optional(),
  gender: Joi.string().optional(),
  phone: Joi.number().optional(),

  // Agency-specific
  website: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  foundedDate: Joi.string().optional(),
  teamSize: Joi.number().optional(),
  specialization: Joi.string().optional(),
  isBlocked: Joi.boolean().optional(),
});

//login validation schema
const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Update validation schema
const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid("traveler", "agency", "admin").optional(),
  isAgent: Joi.string().valid("no", "pending", "yes").optional(),
  profilePic: Joi.string().uri().optional(),
  coverPic: Joi.string().uri().optional(),

  bio: Joi.string().optional(),
  address: Joi.string().optional(),
  age: Joi.number().optional(),
  birthDate: Joi.date().optional(),
  gender: Joi.string().optional(),
  phone: Joi.number().optional(),

  website: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  foundedDate: Joi.string().optional(),
  teamSize: Joi.number().optional(),
  specialization: Joi.string().optional(),
  isBlocked: Joi.boolean().optional(),
});

module.exports = {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
};
