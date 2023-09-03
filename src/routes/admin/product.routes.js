import { Router } from "express";
import productControllers from "../../controllers/admin/product.controllers";
import { upload } from "../../utils/api.utils";

const router = Router();
router.post(
  "/create",
  upload.array("image", 4),
  productControllers.createProduct
);
router.get("/getMany", productControllers.getProducts);
router.get("/getOne", productControllers.getProduct);
router.put("/update", productControllers.editProduct);
router.delete("/delete", productControllers.deleteProduct);

export default router;
