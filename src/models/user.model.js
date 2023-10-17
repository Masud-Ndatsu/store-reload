import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
     {
          first_name: {
               type: String,
               default: "",
          },
          last_name: {
               type: String,
               default: "",
          },
          gender: {
               type: String,
               lowercase: true,
               default: "",
          },
          email: {
               type: String,
               lowercase: true,
          },
          password: {
               type: String,
          },
          phone_number: {
               type: String,
               default: "",
          },
          NIN: {
               type: String,
               default: "",
          },
          avatar: {
               type: String,
               default: "",
          },
          verified: {
               type: Boolean,
               default: false,
          },
          user_type: {
               type: String,
               enum: ["admin", "user"],
               default: "user",
          },
          shop: {
               type: Schema.Types.ObjectId,
               ref: "shops",
          },
     },
     {
          timestamps: true,
     }
);

export const User = model("users", schema);
User.syncIndexes();
