import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "categories",
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

schema.index({ name: "text", description: "text" }, { unique: true });

export const Product = model("products", schema);
Product.syncIndexes();
