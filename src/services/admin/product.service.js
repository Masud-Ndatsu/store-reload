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
            const tags = JSON.parse(req.body.tags);

            const price = Number(req.body.price);

            let images;

            if (req.files) {
                images = await uploadFile(req);
            }

            await Product.create({ ...req.body, images, tags, price });
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

            const products = await Product.find({ type })
                .limit(limit)
                .skip((page - 1) * limit)
                .lean();

            return { data: products };
        } catch (error) {
            throw error;
        }
    };

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
                        from: "categories", // Replace with the name of your Category collection
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
                        // Add other fields as needed
                    },
                },
                {
                    $match: {
                        $or: [
                            {
                                name: { $regex: searchText, $options: "i" },
                            },
                            {
                                category: { $regex: searchText, $options: "i" },
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
            const { productId } = req.query;
            const productReq = req.body;
            const { error, value } = editProductSchema.validate(productReq);
            if (error) {
                throw new AppError(error.message, 400);
            }
            const product = await Product.findById(productId).select("_id").lean();
            if (!product) {
                throw new AppError("product not found", 404);
            }
            await Product.findByIdAndUpdate(productId, { ...value }, { new: true });
            return;
        } catch (error) {
            throw error;
        }
    };
    static deleteProduct = async (req) => {
        try {
            const { productId } = req.query;
            const product = await Product.findById(productId).select("_id").lean();
            if (!product) {
                throw new AppError("product not found", 404);
            }
            await Product.findByIdAndDelete(productId);
            return;
        } catch (error) {
            throw error;
        }
    };
}

export default ProductService;
