import Joi from "joi";
import { _validateID } from "../api.validator";

export const addToCartSchema = Joi.object({
  productId: Joi.custom((value, helper) =>
    _validateID(value, helper, "order")
  ).required(),
  quantity: Joi.custom((value, helper) => {
    if (typeof value !== "number")
      return helper.message("quantity is type number");
    return value;
  }).required(),
});
export const createOrderSchema = Joi.object({
  orderedItems: Joi.custom((value, helper) => {
    value.forEach((item) => {
      return _validateID(item, helper, "order");
    });
    return value;
  }).required(),
  totalPrice: Joi.number().required(),
  shippingAddress: Joi.string().required(),
});

export const getOrderSchema = Joi.object({
  orderId: Joi.custom((value, helper) =>
    _validateID(value, helper, "order")
  ).required(),
});

export const editOrderSchema = Joi.object({
  productId: Joi.custom((value, helper) =>
    _validateID(value, helper, "order")
  ).required(),
  quantity: Joi.number(),
  shippingAddress: Joi.string(),
});
