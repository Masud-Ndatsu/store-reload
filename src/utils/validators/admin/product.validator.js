import Joi from "joi";

export const createProductSchema = Joi.object({
     name: Joi.string().required().trim(),
     description: Joi.string().required().trim(),
     category: Joi.string().required().trim(),
     image: Joi.object().optional(),
     type: Joi.string().trim(),
     price: Joi.string().required(),
     tags: Joi.string().required().trim(),
     manufacturer: Joi.string().required().trim(),
     inventry: Joi.string().required(),
});

export const editProductSchema = Joi.object({
     name: Joi.string().trim(),
     description: Joi.string().trim(),
     category: Joi.string().trim(),
     image: Joi.object().optional(),
     type: Joi.string().trim(),
     price: Joi.string().optional(),
     tags: Joi.string().trim(),
});
