import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  category: Joi.string().required().trim(),
  image: Joi.object().optional(),
  type: Joi.string().trim(),
  price: Joi.number(),
  tags: Joi.string().required().trim(),
});

export const editProductSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  category: Joi.string().trim(),
  image: Joi.object().optional(),
  type: Joi.string().trim(),
  price: Joi.number(),
  tags: Joi.string().required().trim(),
});
