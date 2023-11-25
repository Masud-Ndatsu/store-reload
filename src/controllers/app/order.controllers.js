import OrderService from "../../services/app/order.service";

const addToCart = async (req, res, next) => {
     try {
          await OrderService.addItemCart(req, res.locals.user._id);
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
          await OrderService.updateCartItem(req, res.locals.user._id);
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
          const { data } = await OrderService.getUserCartItems(
               res.locals.user._id
          );
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
          const { data } = await OrderService.createOrder(
               req,
               res.locals.user._id
          );
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
          const { data } = await OrderService.getOrdersPlaced(
               req,
               res.locals.user._id
          );
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
