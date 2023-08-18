import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
      // unique: true,
      default: "",
    },
    NIN: {
      type: String,
      // unique: true,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    shopName: {
      type: String,
      index: true,
    },
    shopAddress: {
      type: String,
      default: "",
    },
    shopLGA: {
      type: String,
      default: "",
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
