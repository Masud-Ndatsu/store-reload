import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
     {
          shop_name: {
               type: String,
               index: true,
          },
          password: {
               type: String,
               required: true,
          },

          address: {
               type: String,
               default: "",
          },
          LGA: {
               type: String,
               default: "",
          },
          auth_code: {
               type: String,
          },
          reset_token: {
               type: String,
          },
     },
     {
          timestamps: true,
     }
);

export const ShopModel = model("shops", schema);
ShopModel.syncIndexes();
