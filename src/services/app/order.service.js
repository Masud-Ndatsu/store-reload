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
    static addItemCart = async (req, userId) => {
        const { error } = addToCartSchema.validate(req.body);

        if (error) {
            throw new ValidationError(error.message);
        }
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId).select("_id").lean();

        if (!product) {
            throw new NotfoundError("Product not found");
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
            throw new NotfoundError("Item not found");
        }
        const cartItem = await OrderItem.findOneAndUpdate(
            { _id: itemId, userId },
            { quantity },
            { new: true }
        );

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
            throw new NotfoundError("Cart is empty");
        }

        const cartItemIds = cartItems.map((cartItem) => cartItem._id);

        const totalPrice = cartItems.reduce(
            (prev, item) => prev + item.product.price * item.quantity,
            0
        );

        return { data: { cartItems, cartItemIds, totalPrice } };
    };

    static createOrder = async (req, userId) => {
        const { error, value } = createOrderSchema.validate(req.body);

        if (error) {
            throw new ValidationError(error.message);
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
                },
            },
            {
                $match: {},
            },
            {
                $project: {
                    shippingAddress: 1,
                    dateOrdered: 1,
                    products: 1,
                    user: {
                        $cond: {
                            if: { $isArray: "$user" },
                            then: {
                                $arrayElemAt: [
                                    {
                                        $map: {
                                            input: "$user",
                                            as: "user",
                                            in: {
                                                _id: "$$user._id",
                                                name: "$$user.shopName",
                                            },
                                        },
                                    },
                                    0,
                                ],
                            },
                            else: "$user",
                        },
                    },
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
        const orderReq = req.body;
        const { error, value } = getOrderSchema.validate(req.query);
        if (error) throw new ValidationError(error.message);

        const { orderId } = value;

        const order = await Order.findById(orderId).select("_id").lean();

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

        const order = await Order.findById(orderId).select("_id").lean();

        if (!order) {
            throw new NotfoundError("Order not found");
        }
        await Order.findByIdAndDelete(orderId);
        return;
    };

    static clearOrderCart = async (userId) => {
        const orderItemCount = await OrderItem.countDocuments({ userId }).select("_id").lean();

        if (orderItemCount === 0) {
            throw new NotfoundError("your cart is empty");
        }
        await OrderItem.deleteMany({ userId });
        return;
    };
}

export default OrderService;
