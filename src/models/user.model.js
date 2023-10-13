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
          NIN: {
               type: String,
               unique: true,
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
          userType: {
               type: String,
               enum: ["admin", "user"],
               default: "user",
          },
          shop: {
               type: Schema.Types.ObjectId,
               ref: "shops",
               required: true,
          },
     },
     {
          timestamps: true,
     }
);

export const User = model("users", schema);
User.syncIndexes();
