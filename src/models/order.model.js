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
          price: {
               type: Number,
               default: 0,
          },
          user: {
               type: Schema.Types.ObjectId,
               ref: "users",
               required: true,
               autopopulate: true,
          },
          shippingAddress: {
               type: String,
          },
          reference: {
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

export const OrderModel = model("orders", schema);
