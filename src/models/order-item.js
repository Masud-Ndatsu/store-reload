import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        userId: {
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
