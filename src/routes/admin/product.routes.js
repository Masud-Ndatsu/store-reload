import { Router } from "express";
import controllers from "../../controllers/admin/product.controllers";
import { upload } from "../../utils/api.utils";

const router = Router();
router.post("/create", upload.array("image", 4), controllers.createProduct);
router.get("/", controllers.getProducts);
router.get("/:product_id", controllers.getProduct);
router.put("/:product_id", controllers.editProduct);
router.delete("/:product_id", controllers.deleteProduct);

export default router;
