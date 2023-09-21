import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        productType: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

schema.index({ name: 1 }, { unique: true });

export const Category = model("categories", schema);
Category.syncIndexes();
