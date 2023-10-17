import Joi from "joi";

export const updateUserSchema = Joi.object({
     first_name: Joi.string().trim(),
     last_name: Joi.string().trim(),
     email: Joi.string().email().trim(),
     gender: Joi.string().lowercase().trim(),
     phone_number: Joi.string().trim(),
     NIN: Joi.string().length(11),
});

export const verifyUserEmailSchema = Joi.object({
     code: Joi.string().required().trim(),
});
