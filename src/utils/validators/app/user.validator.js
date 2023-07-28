import Joi from 'joi';

export const updateUserSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string().email().trim(),
  gender: Joi.string().lowercase().trim(),
  phoneNumber: Joi.string().trim(),
  NIN: Joi.string().length(11),
});

export const verifyUserEmailSchema = Joi.object({
  code: Joi.string().required().trim()
})