import { Router } from "express";
import productRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import orderRoutes from "./order.routes.js";
import paymentRoutes from "./payment.routes.js";
import { authUser } from "../../middlewares/_app/auth.middlewares.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/payment", paymentRoutes);
routes.use(authUser);
routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/orders", orderRoutes);

export default routes;
