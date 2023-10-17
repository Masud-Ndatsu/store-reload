import Joi from "joi";
import { _validateID } from "../api.validator";

export const addToCartSchema = Joi.object({
     product_id: Joi.custom((value, helper) =>
          _validateID(value, helper, "order")
     ).required(),
     quantity: Joi.custom((value, helper) => {
          if (typeof value !== "number")
               return helper.message("quantity is type number");
          return value;
     }).required(),
});
export const createOrderSchema = Joi.object({
     ordered_items: Joi.custom((value, helper) => {
          value.forEach((item) => {
               return _validateID(item, helper, "order");
          });
          return value;
     }).required(),
     total_price: Joi.number().required(),
     shipping_address: Joi.string().required(),
});

export const getOrderSchema = Joi.object({
     order_id: Joi.custom((value, helper) =>
          _validateID(value, helper, "order")
     ).required(),
});

export const editOrderSchema = Joi.object({
     product_id: Joi.custom((value, helper) =>
          _validateID(value, helper, "order")
     ).required(),
     quantity: Joi.number(),
     shipping_address: Joi.string(),
});
