import { Router } from "express";
import productControllers from "../../controllers/app/product.controllers.js";

const router = Router();

router.get("/type", productControllers.getProducts);
router.get("/category", productControllers.getProductsByCategory);
router.get("/search", productControllers.getProductBySearchText);
router.get("/:product_id", productControllers.getProduct);

export default router;
