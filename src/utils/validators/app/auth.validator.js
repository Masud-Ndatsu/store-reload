import Joi from "joi";

export const createUserSchema = Joi.object({
     shop_name: Joi.string().required().trim(),
     password: Joi.string().required().trim().min(8),
     address: Joi.string().required().trim(),
     LGA: Joi.string().required().trim(),
});

export const loginSchema = Joi.object({
     shop_name: Joi.string().required().trim(),
     password: Joi.string().required().trim(),
});

export const resetPasswordOTPSchema = Joi.object({
     code: Joi.string().required().trim(),
});

export const resetPasswordEmailSchema = Joi.object({
     email: Joi.string().required().trim(),
});

export const resetPasswordSchema = Joi.object({
     user_id: Joi.string().required().trim(),
     password: Joi.string().required().trim(),
});
