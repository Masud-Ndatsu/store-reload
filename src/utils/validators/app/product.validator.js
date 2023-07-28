import Joi from "joi";
import { _validateID } from "../api.validator";

export const getProductSchema = Joi.object({
  productId: Joi.custom((value, helper) =>
    _validateID(value, helper, "product")
  ).required(),
});
