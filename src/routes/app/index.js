import { Router } from "express";
import productRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import orderRoutes from "./order.routes.js";
import paymentRoutes from "./payment.routes.js";
import { handleAuth } from "../../middlewares/auth.middlewares.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/payment", paymentRoutes);
routes.use(handleAuth);
routes.use("/user", userRoutes);
routes.use("/product", productRoutes);
routes.use("/order", orderRoutes);

export default routes;
