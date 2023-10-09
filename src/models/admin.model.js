import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        userRoles: {
            type: [
                {
                    type: String,
                    lowercase: true,
                },
            ],
        },
        resetToken: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const Admin = model("admins", schema);
