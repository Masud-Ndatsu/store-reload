import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import { handleAuth } from "../../middlewares/auth.middlewares.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use(handleAuth);
routes.use("/user", userRoutes);
routes.use("/product", productRoutes);

export default routes;
