import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "orderItems",
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    shippingAddress: {
      type: String,
    },
    dateOrdered: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model("orders", schema);
