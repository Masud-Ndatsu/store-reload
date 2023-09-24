import { NotfoundError, ValidationError } from "../../errors/index.js";
import { Product } from "../../models/product.model.js";
import { getProductSchema } from "../../utils/validators/app/product.validator.js";

class ProductService {
    static getProduct = async (req) => {
        try {
            const { productId } = req.query;

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
                throw new NotfoundError("product not found");
            }
            return { data: product };
        } catch (error) {
            throw error;
        }
    };
    static getProducts = async (req) => {
        try {
            const { type } = req.query;

            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 5;

            if (!type) throw new ValidationError("product type is required");

            const products = await Product.aggregate([
                {
                    $match: { $expr: { $eq: [{ $toString: "$type" }, type] } },
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

            const categories = [...new Set(products.map((product) => product.category))];

            const data = products.map((_data, index) => {
                return {
                    category: categories[index],
                    href: `/product/getByCategory?category=${categories[index]}`,
                    data: products.filter((product) => product.category === categories[index]),
                };
            });
            const filteredProducts = data.filter((product) => product.category !== undefined);

            return { data: filteredProducts };
        } catch (error) {
            throw error;
        }
    };

    static getProductBySearchText = async (req) => {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 5;

            const { searchText } = req.query;

            if (!searchText) throw new ValidationError("searchText is required");

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
                                name: { $regex: new RegExp(searchText, "i") },
                            },
                            {
                                "category.name": { $regex: new RegExp(searchText, "i") },
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

    static getProductsByCategory = async (req) => {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 5;

            const { category } = req.query;

            const totalDocuments = await Product.countDocuments({ category }).select("_id").lean();
            const totalPages = Math.ceil(totalDocuments / limit);
            if (!category) throw new NotfoundError("category is required");

            const products = await Product.aggregate({ category }).limit(limit).lean();

            return { data: { products, totalPages } };
        } catch (error) {
            throw error;
        }
    };
}

export default ProductService;
