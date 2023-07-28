import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      index: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      index: true,
    },
    type: {
      type: String,
      enum: ["general", "medical"],
    },
    images: {
      type: [String],
    },
    price: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ name: "text", category: "text", description: "text" });

export const Product = model("products", schema);
