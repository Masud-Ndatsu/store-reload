import { NotfoundError, ValidationError } from "../../errors";
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
        throw new ValidationError(error.message);
      }
      let images = await uploadFile(req);
      await Product.create({ ...req.body, images });
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
      const skipDocuments = (page - 1) * limit;
      const totalDocuments = await Product.countDocuments({ type });
      const totalPages = Math.ceil(totalDocuments / limit);

      if (!type) throw new ValidationError("type is required");

      const products = await Product.find({ type })
        .limit(limit)
        .skip(skipDocuments)
        .lean();

      return { data: { products, totalPages } };
    } catch (error) {
      throw error;
    }
  };

  static getProductBySearchText = async (req) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 5;

      const skipDocuments = (page - 1) * limit;
      const totalDocuments = await Product.countDocuments({});
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
  static editProduct = async (req) => {
    try {
      const { productId } = req.query;
      const productReq = req.body;
      const { error, value } = editProductSchema.validate(productReq);
      if (error) {
        throw new Error(error.message);
      }
      const product = await Product.findById(productId).lean();
      if (!product) {
        throw new NotfoundError("product not found");
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
      const product = await Product.findById(productId).lean();
      if (!product) {
        throw new NotfoundError("product not found");
      }
      await Product.findByIdAndDelete(productId);
      return;
    } catch (error) {
      throw error;
    }
  };
}

export default ProductService;
