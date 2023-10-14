import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
     {
          user: {
               type: Schema.Types.ObjectId,
               ref: "users",
               required: true,
          },
          email: {
               type: String,
          },
          amount: {
               type: Number,
          },
          reference: {
               type: String,
          },
          order: {
               type: Schema.Types.ObjectId,
               ref: "orders",
               required: true,
          },

          status: {
               type: String,
               enum: ["successful", "pending", "failed"],
               default: "pending",
          },
     },
     {
          timestamps: true,
     }
);

export const Transaction = model("transactions", schema);
