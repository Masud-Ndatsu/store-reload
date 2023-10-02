import { Router } from "express";
import productControllers from "../../controllers/admin/product.controllers";
import { upload } from "../../utils/api.utils";

const router = Router();
router.post("/create", upload.array("image", 4), productControllers.createProduct);
router.get("/", productControllers.getProducts);
router.get("/:productId", productControllers.getProduct);
router.put("/:productId", productControllers.editProduct);
router.delete("/:productId", productControllers.deleteProduct);

export default router;
