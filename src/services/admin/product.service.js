import { AppError } from "../../errors";
import { Product } from "../../models/product.model";
import {
     createProductSchema,
     editProductSchema,
} from "../../utils/validators/admin/product.validator";
import { uploadFile } from "../storage/cloudinary.service";

class ProductService {
     static createProduct = async (req) => {
          try {
               const { error } = createProductSchema.validate(req.body);
               if (error) {
                    throw new AppError(error.message);
               }
               req.body.tags = JSON.parse(req.body.tags);

               req.body.price = Number(req.body.price);

               req.body.inventry = Number(req.body.inventry);

               if (req.files) {
                    req.body.images = await uploadFile(req);
               }

               await new Product({
                    ...req.body,
               }).save();

               return;
          } catch (error) {
               throw error;
          }
     };
     static getProducts = async (req) => {
          try {
               const { type } = req.query;

               const page = req.query.page ? Number(req.query.page) : 1;
               const limit = req.query.limit ? Number(req.query.limit) : 5;

               if (!type) {
                    throw new AppError("type is required", 400);
               }

               const products = await Product.aggregate([
                    { $match: { type } },
                    ,
                    {
                         $limit: limit,
                    },
                    {
                         $skip: (page - 1) * limit,
                    },
               ]);

               return { data: products };
          } catch (error) {
               throw error;
          }
     };

     static getProductBySearchText = async (req) => {
          try {
               const page = req.query.page ? Number(req.query.page) : 1;
               const limit = req.query.limit ? Number(req.query.limit) : 5;

               const { search_text } = req.query;

               if (!search_text) {
                    throw new AppError("search_text is required", 400);
               }

               const products = await Product.aggregate([
                    {
                         $lookup: {
                              from: "categories",
                              localField: "category",
                              foreignField: "_id",
                              as: "category",
                         },
                    },
                    {
                         $unwind: {
                              path: "$category",
                              preserveNullAndEmptyArrays: true,
                         },
                    },
                    {
                         $group: {
                              _id: "$_id",
                              name: { $first: "$name" },
                              category: { $first: "$category.name" },
                              price: { $first: "$price" },
                              images: { $first: "$images" },
                         },
                    },
                    {
                         $match: {
                              $or: [
                                   {
                                        name: {
                                             $regex: search_text,
                                             $options: "i",
                                        },
                                   },
                                   {
                                        category: {
                                             $regex: search_text,
                                             $options: "i",
                                        },
                                   },
                              ],
                         },
                    },
                    {
                         $skip: (page - 1) * limit,
                    },
                    {
                         $limit: limit,
                    },
               ]);

               return { data: products };
          } catch (error) {
               throw error;
          }
     };
     static editProduct = async (req) => {
          try {
               const { product_id } = req.params;
               const { error, value } = editProductSchema.validate(req.body);
               if (error) {
                    throw new AppError(error.message, 400);
               }
               const product = await Product.findById(product_id)
                    .select("_id")
                    .lean();
               if (!product) {
                    throw new AppError("product not found", 404);
               }
               await Product.findOneAndUpdate(
                    {
                         _id: product._id,
                    },
                    {
                         ...value,
                    },
                    { new: true }
               );
               return;
          } catch (error) {
               throw error;
          }
     };
     static deleteProduct = async (req) => {
          try {
               const { product_id } = req.params;
               const product = await Product.findById(product_id)
                    .select("_id")
                    .lean();
               if (!product) {
                    throw new AppError("product not found", 404);
               }
               await Product.findByIdAndDelete(product_id);
               return;
          } catch (error) {
               throw error;
          }
     };
}

export default ProductService;
