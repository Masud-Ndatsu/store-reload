import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
     {
          name: {
               type: String,
               required: true,
          },
          description: {
               type: String,
               required: true,
          },
          category: {
               type: Schema.Types.ObjectId,
               required: true,
               ref: "categories",
          },
          type: {
               type: String,
               enum: ["general", "medical"],
               default: "general",
          },
          images: {
               type: [String],
          },
          price: {
               type: Number,
               default: 0,
               min: 0,
          },
          tags: {
               type: [String],
          },
          inventory: {
               type: Number,
               default: 0,
               min: 0,
          },
          manufacturer: {
               type: String,
          },
          ratings: {
               type: [
                    {
                         user: Schema.Types.ObjectId,
                         rating: {
                              type: Number,
                              min: 1,
                              max: 5,
                         },
                         review: String,
                    },
               ],
          },
          featured: {
               type: Boolean,
               default: false,
          },
          is_active: {
               type: Boolean,
               default: true,
          },
          reviews: {
               type: [
                    {
                         userId: Schema.Types.ObjectId,
                         review: String,
                    },
               ],
          },
     },
     {
          timestamps: true,
     }
);

schema.index({ name: "text", description: "text" }, { unique: true });

export const Product = model("products", schema);
Product.syncIndexes();
