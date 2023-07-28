import { Router } from "express";
import productControllers from "../../controllers/app/product.controllers.js";

const router = Router();

router.get("/getOne", productControllers.getProduct);
router.get("/getMany", productControllers.getProducts);
router.get("/getByCategory", productControllers.getProductsByCategory);
router.get("/getBySearchText", productControllers.getProductBySearchText);

export default router;
