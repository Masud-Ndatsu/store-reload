import Joi from "joi";
import { _validateID } from "../api.validator";

export const getProductSchema = Joi.object({
     product_id: Joi.custom((value, helper) =>
          _validateID(value, helper, "product")
     ).required(),
});
