import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
    {
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "orderItems",
                required: true,
            },
        ],
        totalPrice: {
            type: Number,
            default: 0,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
            autopopulate: true,
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
