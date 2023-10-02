import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import categoryRoutes from "./category.routes.js";

import { authAdminUser } from "../../middlewares/_admin/authmiddleware.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use(authAdminUser);
routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/categories", categoryRoutes);

export default routes;
