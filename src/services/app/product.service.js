import { AppError } from "../../errors/index.js";
import { Category } from "../../models/category.model.js";
import { Product } from "../../models/product.model.js";

class ProductService {
     // Get Product By product_id
     static getProduct = async (req) => {
          try {
               const { product_id } = req.params;

               if (!product_id) {
                    throw new AppError("product_id is required");
               }

               const [product] = await Product.aggregate([
                    {
                         $match: {
                              $expr: {
                                   $eq: [{ $toString: "$_id" }, product_id],
                              },
                         },
                    },
                    {
                         $project: {
                              name: 1,
                              images: 1,
                              description: 1,
                              price: 1,
                         },
                    },
               ]);

               if (!product) {
                    throw new AppError("product not found", 404);
               }
               return {
                    data: product,
               };
          } catch (error) {
               throw error;
          }
     };

     // Get Product By Product Type
     static getProducts = async (req) => {
          try {
               const { type } = req.query;

               const page = req.query.page ? Number(req.query.page) : 1;
               const limit = req.query.limit ? Number(req.query.limit) : 5;

               if (!type) {
                    throw new AppError("product type is required", 400);
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
                         $match: {
                              $expr: { $eq: ["$type", type] },
                         },
                    },
                    {
                         $project: {
                              name: 1,
                              images: 1,
                              price: 1,
                              category: 1,
                         },
                    },
                    {
                         $skip: (page - 1) * limit,
                    },
                    {
                         $limit: limit,
                    },
               ]);

               // Get All Categories By Product Type
               const catArr = await Category.aggregate([
                    {
                         $match: { product_type: type },
                    },
               ]);

               const categories = [
                    ...new Set(catArr.map((category) => category.name)),
               ];

               const data = products.map((_data, index) => ({
                    category: categories[index],
                    href: `/product/getByCategory?category=${categories[index]}`,
                    data: products.filter(
                         (product) =>
                              product.category[0]?.name === categories[index]
                    ),
               }));

               const filteredProducts = data.filter(
                    (product) => product.category.name !== undefined
               );

               return { data: filteredProducts };
          } catch (error) {
               throw error;
          }
     };

     // Get Products By searchText
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
                         $match: {
                              $or: [
                                   {
                                        name: {
                                             $regex: new RegExp(
                                                  search_text,
                                                  "i"
                                             ),
                                        },
                                   },
                                   {
                                        "category.name": {
                                             $regex: new RegExp(
                                                  search_text,
                                                  "i"
                                             ),
                                        },
                                   },
                              ],
                         },
                    },
                    {
                         $project: {
                              name: 1,
                              images: 1,
                              price: 1,
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

     // Get Products By Product Category
     static getProductsByCategory = async (req) => {
          try {
               const page = req.query.page ? Number(req.query.page) : 1;
               const limit = req.query.limit ? Number(req.query.limit) : 5;

               const { category } = req.query;

               if (!category) {
                    throw new AppError("category is required", 400);
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
                         $match: {
                              $expr: { $eq: ["$category", category] },
                         },
                    },
                    {
                         $project: {
                              name: 1,
                              images: 1,
                              price: 1,
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
               console.log({ error });
               throw error;
          }
     };

     static getProductByTags = async (req) => {
          const { tags } = req.query;
          try {
               const products = await Product.aggregate([
                    {
                         $match: {},
                    },
               ]);
          } catch (error) {
               throw error;
          }
     };
}

export default ProductService;
