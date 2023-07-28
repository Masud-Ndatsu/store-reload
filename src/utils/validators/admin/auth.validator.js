import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const forgotPasswordEmailSchema = Joi.object({
  email: Joi.string().required().trim(),
});

export const newPasswordSchema = Joi.object({
  password: Joi.string().required().trim(),
  userId: Joi.string().required().trim(),
  token: Joi.string().required().trim(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
