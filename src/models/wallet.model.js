import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
            autopopulate: true,
        },
        balance: {
            type: Number,
            default: 0,
            min: 0,
        },
        accountNumber: {
            type: String,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Wallet = model("wallets", schema);
