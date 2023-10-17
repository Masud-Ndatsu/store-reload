import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
     {
          user: {
               type: Schema.Types.ObjectId,
               ref: "users",
               required: true,
          },
          message: {
               type: String,
               required: true,
          },
          replies: [
               {
                    user: {
                         type: Schema.Types.ObjectId,
                         ref: "users",
                         required: true,
                    },
                    reply: {
                         type: String,
                         required: true,
                    },
               },
          ],
     },

     {
          timestamps: true,
     }
);

export const SupportModel = model("supports", schema);
