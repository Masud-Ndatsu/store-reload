import OrderService from "../../services/app/order.service";

const addToCart = async (req, res, next) => {
     try {
          const userId = res.locals.user._id;
          await OrderService.addItemCart(req, userId);
          return res.status(200).json({
               status: true,
               data: null,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};
const updateCartItem = async (req, res, next) => {
     try {
          const userId = res.locals.user._id;
          await OrderService.updateCartItem(req, userId);
          return res.status(200).json({
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
          const userId = res.locals.user._id;
          const { data } = await OrderService.getUserCartItems(userId);
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
          const userId = res.locals.user._id;
          const { data } = await OrderService.createOrder(req, userId);
          return res.status(200).json({
               status: true,
               data,
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
const getOrders = async (req, res, next) => {
     try {
          const userId = res.locals.user._id;
          const { data } = await OrderService.getOrdersPlaced(req, userId);
          return res.status(200).json({
               status: true,
               data,
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
          await OrderService.clearCartItems(res.locals.user._id);
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
     getOrders,
     deleteOrder,
     updateCartItem,
     clearOrderCart,
};
