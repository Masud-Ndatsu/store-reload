import { NotfoundError, ValidationError } from "../../errors";
import { OrderItem } from "../../models/order-item";
import { Order } from "../../models/order.model";
import { Product } from "../../models/product.model";
import {
  createOrderSchema,
  addToCartSchema,
  getOrderSchema,
} from "../../utils/validators/app/order.validator";

class OrderService {
  static addToCart = async (req, res) => {
    const { error, value } = addToCartSchema.validate(req.body);

    if (error) {
      throw new ValidationError(error.message);
    }
    const { productId, quantity } = value;

    const userId = res.locals.user._id;

    const product = await Product.findById(productId).lean();

    if (!product) {
      throw new NotfoundError("Product not found");
    }

    await OrderItem.create({
      product: productId,
      quantity,
      userId,
    });
    return;
  };

  static getUserCart = async (res) => {
    const userId = res.locals.user._id;
    const cartItems = await OrderItem.find({ userId }).populate(
      "product",
      "_id name image price"
    );
    const cartItemsCount = await OrderItem.countDocuments({ userId });

    if (cartItemsCount === 0) {
      throw new NotfoundError("Cart is empty");
    }
    const cartItemIds = cartItems.map((cartItem) => cartItem._id);

    const totalPrice = cartItems.reduce((prev, cartItem) => {
      return prev + cartItem.product.price * cartItem.quantity;
    }, 0);

    return { data: { cartItems, cartItemIds, totalPrice } };
  };

  static createOrder = async (req, res) => {
    const { error, value } = createOrderSchema.validate(req.body);

    if (error) {
      throw new ValidationError(error.message);
    }

    const { orderedItems, totalPrice, shippingAddress } = value;

    const userId = res.locals.user._id;

    await Order.create({
      products: orderedItems,
      userId,
      totalPrice,
      shippingAddress,
    });
    return;
  };
  static getOrder = async (req) => {
    const { orderId } = req.query;
    const { error } = getOrderSchema.validate(req.query);

    if (error) {
      throw new ValidationError(error.message);
    }

    const order = await Order.findById(orderId).lean();
    if (!order) {
      throw new NotfoundError("Order not found");
    }

    return { data: order };
  };

  static getOrdersPlaced = async (req) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 5;

    const skipDocuments = (page - 1) * limit;
    const totalDocuments = await Order.countDocuments({});
    const totalPages = Math.ceil(totalDocuments / limit);

    const orders = await Order.find({})
      .limit(limit)
      .skip(skipDocuments)
      .populate("products")
      .populate("products.product")
      .populate("userId", "_id email")
      .lean();
    return { data: { orders, totalPages } };
  };

  static editOrder = async (req) => {
    const orderReq = req.body;
    const { error, value } = getOrderSchema.validate(req.query);
    if (error) throw new ValidationError(error.message);

    const { orderId } = value;

    const order = await Order.findById(orderId).lean();

    if (!order) {
      throw new NotfoundError("Order not found");
    }

    await Order.findByIdAndUpdate(orderId, { ...orderReq }, { new: true });
    return;
  };

  static deleteOrder = async (req) => {
    const { error, value } = getOrderSchema.validate(req.query);
    if (error) throw new ValidationError(error.message);

    const { orderId } = value;

    const order = await Order.findById(orderId).lean();

    if (!order) {
      throw new NotfoundError("Order not found");
    }
    await Order.findByIdAndDelete(orderId);
    return;
  };

  static clearOrderCart = async (res) => {
    const userId = res.locals.user._id;

    const orderItemCount = await OrderItem.countDocuments({ userId });

    if (orderItemCount === 0) {
      throw new NotfoundError("your cart is empty");
    }
    await OrderItem.deleteMany({ userId });
    return;
  };
}

export default OrderService;
