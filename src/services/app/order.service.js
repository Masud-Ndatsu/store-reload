import { AppError } from "../../errors";
import { OrderItem } from "../../models/order-item";
import { Order } from "../../models/order.model";
import { Product } from "../../models/product.model";
import { createOrderSchema, addToCartSchema, getOrderSchema } from "../../utils/validators/app/order.validator";

class OrderService {
    static addItemCart = async (req, userId) => {
        const { error } = addToCartSchema.validate(req.body);

        if (error) {
            throw new AppError(error.message, 400);
        }
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId).select("_id").lean();

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        await OrderItem.create({
            productId,
            quantity,
            userId,
        });
        return;
    };

    static updateCartItem = async (req, userId) => {
        const { itemId, quantity } = req.body;
        const item = await OrderItem.findOne({ _id: itemId, userId }).lean();

        if (!item) {
            throw new AppError("Item not found", 404);
        }
        const cartItem = await OrderItem.findOneAndUpdate({ _id: itemId, userId }, { quantity }, { new: true });

        return cartItem;
    };

    static getUserCartItems = async (userId) => {
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
                        $eq: [{ $toString: "$userId" }, userId.toString()],
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

        const totalPrice = cartItems.reduce((prev, item) => prev + item.product.price * item.quantity, 0);

        return { data: { cartItems, cartItemIds, totalPrice } };
    };

    static createOrder = async (req, userId) => {
        const { error, value } = createOrderSchema.validate(req.body);

        if (error) {
            throw new AppError(error.message, 400);
        }

        const { orderedItems, totalPrice, shippingAddress } = value;

        await Order.create({
            products: orderedItems,
            userId,
            totalPrice,
            shippingAddress,
        });
        return;
    };

    static getOrder = async (req) => {
        const { orderId } = req.params;
        const { error } = getOrderSchema.validate(req.params);

        if (error) {
            throw new AppError(error.message, 400);
        }

        const order = await Order.findById(orderId).lean();

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        return { data: order };
    };

    static getOrdersPlaced = async (req, userId) => {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 5;

        const orders = await Order.aggregate([
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

        const order = await Order.findOne({ _id: orderId }).select("_id").lean();

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        const updatedOrder = await Order.findOneAndUpdate({ _id: orderId }, { ...req.body }, { new: true });
        return updatedOrder;
    };

    static deleteOrder = async (req) => {
        const { error, value } = getOrderSchema.validate(req.params);
        if (error) {
            throw new AppError(error.message, 400);
        }

        const { orderId } = value;

        const order = await Order.findById(orderId).select("_id").lean();

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
