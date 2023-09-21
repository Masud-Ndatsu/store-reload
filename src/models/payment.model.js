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
    provider: {
      type: String,
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

export const Payment = model("payments", schema);
