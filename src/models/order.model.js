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
          shipping_address: {
               type: String,
          },
          reference: {
               type: String,
          },
          date_ordered: {
               type: Date,
               default: Date.now(),
          },
     },
     {
          timestamps: true,
     }
);

export const OrderModel = model("orders", schema);
