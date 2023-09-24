import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
            autopopulate: true,
        },
        amount: {
            type: Number,
        },
        provider: {
            type: String,
        },
        type: {
            type: String,
            enum: ["deposit", "withdrawal", "transfer"],
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
