import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
     {
          user: {
               type: Schema.Types.ObjectId,
               ref: "users",
               required: true,
               autopopulate: true,
          },
          balance: {
               type: Number,
               default: 0,
               min: 0,
          },
          accountNumber: {
               type: String,
          },
          reference: {
               type: String,
               required: true,
          },
          isBlocked: {
               type: Boolean,
               default: false,
          },
     },
     {
          timestamps: true,
     }
);

export const Wallet = model("wallets", schema);
