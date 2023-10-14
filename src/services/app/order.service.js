import { AppError } from "../../errors";
import { OrderItem } from "../../models/order-item";
import { Order, OrderModel } from "../../models/order.model";
import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";
import {
     createOrderSchema,
     addToCartSchema,
     getOrderSchema,
} from "../../utils/validators/app/order.validator";
import paymentService from "./payment.service";

class OrderService {
     static addItemCart = async (req, user_id) => {
          const { error } = addToCartSchema.validate(req.body);

          if (error) {
               throw new AppError(error.message, 400);
          }
          const { productId, quantity } = req.body;

          const product = await Product.findById(productId)
               .select("_id")
               .lean();

          if (!product) {
               throw new AppError("Product not found", 404);
          }

          await OrderItem.create({
               product: product._id,
               quantity,
               user: user_id,
          });
          return;
     };

     static updateCartItem = async (req, userId) => {
          const { itemId, quantity } = req.body;
          const item = await OrderItem.findOne({ _id: itemId, userId }).lean();

          if (!item) {
               throw new AppError("Item not found", 404);
          }
          const cartItem = await OrderItem.findOneAndUpdate(
               {
                    _id: itemId,
                    user: userId,
               },
               { quantity },
               { new: true }
          );

          return cartItem;
     };

     static getUserCartItems = async (user_id) => {
          const cartItems = await OrderItem.aggregate([
               {
                    $lookup: {
                         from: "products",
                         localField: "productId",
                         foreignField: "_id",
                         as: "product",
                    },
               },
               {
                    $match: {
                         $expr: {
                              $eq: [
                                   { $toString: "$userId" },
                                   user_id.toString(),
                              ],
                         },
                    },
               },

               {
                    $project: {
                         _id: 1,
                         quantity: 1,
                         product: { $arrayElemAt: ["$product", 0] },
                    },
               },
          ]);

          if (cartItems.length === 0) {
               throw new AppError("Cart is empty", 404);
          }

          const cartItemIds = cartItems.map((cartItem) => cartItem._id);

          const totalPrice = cartItems.reduce(
               (prev, item) => prev + item.product.price * item.quantity,
               0
          );

          return { data: { cartItems, cartItemIds, totalPrice } };
     };

     static createOrder = async (req, user_id) => {
          const { error, value } = createOrderSchema.validate(req.body);

          if (error) {
               throw new AppError(error.message, 400);
          }

          const user = await User.findById(user_id).lean();

          const newOrder = new OrderModel();

          const { orderedItems, totalPrice, shippingAddress } = value;

          const payInt = await paymentService.initialize({
               user: user._id,
               amount: Number(totalPrice),
               email: user.email,
               order: newOrder._id,
          });

          if (!payInt.status) {
               throw new AppError(
                    "Payment Initialization failed. Please try again.",
                    400
               );
          }

          await new OrderModel({
               _id: newOrder._id,
               products: orderedItems,
               user: user._id,
               price: Number(totalPrice),
               shippingAddress,
               reference: payInt.data.reference,
          }).save();

          return {
               data: {
                    ...payInt.data,
               },
          };
     };

     static getOrder = async (req) => {
          const { orderId } = req.params;
          const { error } = getOrderSchema.validate(req.params);

          if (error) {
               throw new AppError(error.message, 400);
          }

          const order = await OrderModel.findById(orderId).lean();

          if (!order) {
               throw new AppError("Order not found", 404);
          }

          return { data: order };
     };

     static getOrdersPlaced = async (req, userId) => {
          const page = req.query.page ? Number(req.query.page) : 1;
          const limit = req.query.limit ? Number(req.query.limit) : 5;

          const orders = await OrderModel.aggregate([
               {
                    $lookup: {
                         from: "orderitems",
                         localField: "products",
                         foreignField: "_id",
                         as: "products",
                    },
               },
               {
                    $lookup: {
                         from: "shops",
                         localField: "userId",
                         foreignField: "_id",
                         as: "user",
                         pipeline: [
                              {
                                   $project: {
                                        password: 0,
                                        createdAt: 0,
                                        updatedAt: 0,
                                   },
                              },
                         ],
                    },
               },
               {
                    $match: {
                         userId,
                    },
               },
               {
                    $skip: (page - 1) * limit,
               },
               {
                    $limit: limit,
               },
          ]);

          return { data: orders };
     };

     static editOrder = async (req) => {
          const { error, value } = getOrderSchema.validate(req.params);

          if (error) {
               throw new AppError(error.message, 400);
          }

          const { orderId } = value;

          const order = await OrderModel.findOne({ _id: orderId })
               .select("_id")
               .lean();

          if (!order) {
               throw new AppError("Order not found", 404);
          }

          const { orderedItems } = req.body;

          const updatedOrder = await OrderModel.findOneAndUpdate(
               { _id: orderId },
               {
                    ...req.body,
                    products: orderedItems,
               },
               { new: true }
          );
          return updatedOrder;
     };

     static deleteOrder = async (req) => {
          const { error, value } = getOrderSchema.validate(req.params);
          if (error) {
               throw new AppError(error.message, 400);
          }

          const { orderId } = value;

          const order = await OrderModel.findById(orderId).select("_id").lean();

          if (!order) {
               throw new AppError("Order not found", 404);
          }
          await Order.findByIdAndDelete(orderId);
          return;
     };

     static clearCartItems = async (userId) => {
          const orderItems = await OrderItem.aggregate([
               {
                    $match: {
                         userId,
                    },
               },
          ]);

          if (orderItems.length === 0) {
               throw new AppError("your cart is empty", 404);
          }
          const items = await OrderItem.deleteMany({ userId });
          return items;
     };
}

export default OrderService;
