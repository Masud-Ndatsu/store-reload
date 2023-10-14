import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
     {
          product: {
               type: Schema.Types.ObjectId,
               ref: "products",
               required: true,
          },
          quantity: {
               type: Number,
               required: true,
          },
          user: {
               type: Schema.Types.ObjectId,
               ref: "users",
               required: true,
          },
     },
     {
          timestamps: true,
     }
);

export const OrderItem = model("orderItems", schema);
