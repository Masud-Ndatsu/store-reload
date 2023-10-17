import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
     {
          shop: {
               type: Schema.Types.ObjectId,
               ref: "shops",
               required: true,
          },
          balance: {
               type: Number,
               default: 0,
               min: 0,
          },
          account_number: {
               type: String,
               required: true,
          },
          wlt_reference: {
               type: String,
               required: true,
          },
          bank_name: {
               type: String,
               required: true,
          },
     },
     {
          timestamps: true,
     }
);

export const Wallet = model("wallets", schema);
