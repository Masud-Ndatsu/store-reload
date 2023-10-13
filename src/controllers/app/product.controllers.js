import ProductService from "../../services/app/product.service.js";

const getProduct = async (req, res, next) => {
     try {
          const { data } = await ProductService.getProduct(req);
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};
const getProducts = async (req, res, next) => {
     try {
          const { data } = await ProductService.getProducts(req);
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const getProductsByCategory = async (req, res, next) => {
     try {
          const { data } = await ProductService.getProductsByCategory(req);
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const getProductBySearchText = async (req, res, next) => {
     try {
          const { data } = await ProductService.getProductBySearchText(req);
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

export default {
     getProduct,
     getProducts,
     getProductsByCategory,
     getProductBySearchText,
};
