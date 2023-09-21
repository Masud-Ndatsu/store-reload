import { NotfoundError } from "../../errors/index.js";
import { Product } from "../../models/product.model.js";
import { getProductSchema } from "../../utils/validators/app/product.validator.js";

class ProductService {
    static getProduct = async (req) => {
        try {
            const { productId } = getProductSchema.validate(req.query);

            const product = await Product.findById(productId).lean();
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

            const skipDocuments = (page - 1) * limit;
            const totalDocuments = await Product.countDocuments({ type }).select("_id").lean();
            const totalPages = Math.ceil(totalDocuments / limit);

            if (!type) throw new NotfoundError("product type is required");

            const products = await Product.find({ type }).limit(limit).skip(skipDocuments).lean();

            const categories = [...new Set(products.map((product) => product.category))];

            const data = products.map((data, idx) => {
                return {
                    category: categories[idx],
                    href: `/product/getByCategory?category=${categories[idx]}`,
                    data: products.filter((product) => product.category === categories[idx]),
                };
            });

            const transformed = data.filter((product) => {
                return product.category !== undefined;
            });

            return { data: { products: transformed, totalPages } };
        } catch (error) {
            throw error;
        }
    };

    static getProductBySearchText = async (req) => {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 5;

            const skipDocuments = (page - 1) * limit;
            const totalDocuments = await Product.countDocuments({}).select("_id").lean();
            const totalPages = Math.ceil(totalDocuments / limit);

            const { searchText } = req.query;

            if (!searchText) throw new NotfoundError("searchText is required");

            const products = await Product.find({
                $or: [
                    {
                        name: { $regex: searchText, $options: "i" },
                    },
                    {
                        category: { $regex: searchText, $options: "i" },
                    },
                ],
            })
                .limit(limit)
                .skip(skipDocuments)
                .lean();

            return { data: { products, totalPages } };
        } catch (error) {
            throw error;
        }
    };

    static getProductsByCategory = async (req) => {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 5;
            const { category } = req.query;
            const skipDocuments = (page - 1) * limit;
            const totalDocuments = await Product.countDocuments({ category }).select("_id").lean();
            const totalPages = Math.ceil(totalDocuments / limit);
            if (!category) throw new NotfoundError("category is required");

            const products = await Product.find({ category }).limit(limit).skip(skipDocuments).lean();

            return { data: { products, totalPages } };
        } catch (error) {
            throw error;
        }
    };
}

export default ProductService;
