import ProductService from "../../services/admin/product.service";

const createProduct = async (req, res, next) => {
  try {
    await ProductService.createProduct(req);
    return res.status(201).json({
      status: true,
      data: null,
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
const getProduct = async (req, res, next) => {
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

const editProduct = async (req, res, next) => {
  try {
    await ProductService.editProduct(req);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    await ProductService.deleteProduct(req);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
};
