import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      // unique: true,
    },
    phoneNumber: {
      type: String,
      // unique: true,
    },
    NIN: {
      type: String,
      // unique: true,
    },
    avatar: {
      type: String,
    },
    shopName: {
      type: String,
      index: true,
    },
    shopAddress: {
      type: String,
    },
    shopLGA: {
      type: String,
    },
    password: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationCode: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    resetToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  }
);

export const User = model("users", schema);
