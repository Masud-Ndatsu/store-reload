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
          const { product_id, quantity } = req.body;

          const product = await Product.findById(product_id)
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

     static updateCartItem = async (req, user_id) => {
          const { item_id, quantity } = req.body;

          const item = await OrderItem.findOne({
               _id: item_id,
               user: user_id,
          }).lean();

          if (!item) {
               throw new AppError("Item not found", 404);
          }
          await OrderItem.findOneAndUpdate(
               {
                    _id: item._id,
                    user: user_id,
               },
               {
                    quantity,
               },
               {
                    new: true,
               }
          );

          return;
     };

     static getUserCartItems = async (user_id) => {
          const cart_items = await OrderItem.aggregate([
               {
                    $lookup: {
                         from: "products",
                         localField: "product_id",
                         foreignField: "_id",
                         as: "product",
                    },
               },
               {
                    $match: {
                         $expr: {
                              $eq: [{ $toString: "$user" }, user_id.toString()],
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

          if (cart_items.length === 0) {
               throw new AppError("Cart is empty", 404);
          }

          const cartItem_ids = cart_items.map((cartItem) => cartItem._id);

          const total_price = cart_items.reduce(
               (prev, item) => prev + item.product.price * item.quantity,
               0
          );

          return {
               data: {
                    cart_items,
                    cartItem_ids,
                    total_price,
               },
          };
     };

     static createOrder = async (req, user_id) => {
          const { error, value } = createOrderSchema.validate(req.body);

          if (error) {
               throw new AppError(error.message, 400);
          }

          const user = await User.findById(user_id).lean();

          const newOrder = new OrderModel();

          const { ordered_items, total_price, shipping_address } = value;

          const payInt = await paymentService.initialize({
               user: user._id,
               amount: Number(total_price),
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
               products: ordered_items,
               user: user._id,
               price: Number(total_price),
               shipping_address,
               reference: payInt.data.reference,
          }).save();

          return {
               data: {
                    ...payInt.data,
               },
          };
     };

     static getOrder = async (req) => {
          const { order_id } = req.params;
          const { error } = getOrderSchema.validate(req.params);

          if (error) {
               throw new AppError(error.message, 400);
          }

          const order = await OrderModel.findById(order_id).lean();

          if (!order) {
               throw new AppError("Order not found", 404);
          }

          return { data: order };
     };

     static getOrdersPlaced = async (req, user_id) => {
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
                         localField: "user_id",
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
                         user_id,
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

     static deleteOrder = async (req) => {
          const { error, value } = getOrderSchema.validate(req.params);
          if (error) {
               throw new AppError(error.message, 400);
          }

          const { order_id } = value;

          const order = await OrderModel.findById(order_id)
               .select("_id")
               .lean();

          if (!order) {
               throw new AppError("Order not found", 404);
          }
          await Order.findByIdAndDelete(order_id);
          return;
     };

     static clearCartItems = async (user_id) => {
          const orderItems = await OrderItem.aggregate([
               {
                    $match: {
                         user_id,
                    },
               },
          ]);

          if (orderItems.length === 0) {
               throw new AppError("your cart is empty", 404);
          }
          const items = await OrderItem.deleteMany({ user_id });
          return items;
     };
}

export default OrderService;
