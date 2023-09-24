import Joi from "joi";

export const createUserSchema = Joi.object({
    shopName: Joi.string().required().trim(),
    password: Joi.string().required().trim().min(8),
    address: Joi.string().required().trim(),
    LGA: Joi.string().required().trim(),
});

export const loginSchema = Joi.object({
    shopName: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
});

export const resetPasswordOTPSchema = Joi.object({
    code: Joi.string().required().trim(),
});

export const resetPasswordEmailSchema = Joi.object({
    email: Joi.string().required().trim(),
});

export const resetPasswordSchema = Joi.object({
    userID: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
});
