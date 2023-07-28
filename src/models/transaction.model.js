import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    amount: {
      type: Number,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "payments",
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model("transactions", schema);
