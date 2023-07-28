import OrderService from "../../services/app/order.service";

const addToCart = async (req, res, next) => {
  try {
    await OrderService.addToCart(req, res);
    return res.status(201).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const getUserCart = async (req, res, next) => {
  try {
    const { data } = await OrderService.getUserCart(res);
    return res.status(200).json({
      status: true,
      data,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const createOrder = async (req, res, next) => {
  try {
    await OrderService.createOrder(req, res);
    return res.status(201).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const getOrder = async (req, res, next) => {
  try {
    const { data } = await OrderService.getOrder(req);
    return res.status(200).json({
      status: true,
      data,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const getOrdersPlaced = async (req, res, next) => {
  try {
    const { data } = await OrderService.getOrdersPlaced(req);
    return res.status(200).json({
      status: true,
      data,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    await OrderService.editOrder(req);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    await OrderService.deleteOrder(req);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const clearOrderCart = async (req, res, next) => {
  try {
    await OrderService.clearOrderCart(res);
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
  createOrder,
  getOrder,
  addToCart,
  getUserCart,
  getOrdersPlaced,
  updateOrder,
  deleteOrder,
  clearOrderCart,
};
