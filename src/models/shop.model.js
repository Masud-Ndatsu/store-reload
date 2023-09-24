import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
    {
        shopName: {
            type: String,
            lowercase: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
        LGA: {
            type: String,
            default: "",
        },
        authCode: {
            type: String,
        },
        resetToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const ShopModel = model("shops", schema);
ShopModel.syncIndexes();
