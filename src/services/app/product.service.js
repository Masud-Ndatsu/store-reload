import { AppError } from "../../errors/index.js";
import { Category } from "../../models/category.model.js";
import { Product } from "../../models/product.model.js";

class ProductService {
     // Get Product By ProductID
     static getProduct = async (req) => {
          try {
               const { productId } = req.params;

               if (!productId) {
                    throw new AppError("productId is required");
               }

               const [product] = await Product.aggregate([
                    {
                         $match: {
                              $expr: {
                                   $eq: [{ $toString: "$_id" }, productId],
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
               return { data: product };
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
                              $expr: { $eq: [{ $toString: "$type" }, type] },
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
               const catArr = await Category.find({ productType: type });

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

               const { searchText } = req.query;

               if (!searchText) {
                    throw new AppError("searchText is required", 400);
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
                                                  searchText,
                                                  "i"
                                             ),
                                        },
                                   },
                                   {
                                        "category.name": {
                                             $regex: new RegExp(
                                                  searchText,
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
}

export default ProductService;
