import { Router } from "express";
import productRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import orderRoutes from "./order.routes.js";
import paymentRoutes from "./payment.routes.js";
import { handleAuth } from "../../middlewares/auth.middlewares.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", handleAuth, userRoutes);
routes.use("/product", handleAuth, productRoutes);
routes.use("/order", handleAuth, orderRoutes);
routes.use("/payment", paymentRoutes);

export default routes;
