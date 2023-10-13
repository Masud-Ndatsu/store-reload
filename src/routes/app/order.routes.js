import { Router } from "express";
import orderControllers from "../../controllers/app/order.controllers.js";

const router = Router();

router.post("/cart", orderControllers.addToCart);
router.post("/create", orderControllers.createOrder);
router.get("/cart", orderControllers.getUserCart);
router.get("/:orderId", orderControllers.getOrder);
router.get("/", orderControllers.getOrders);
router.put("/:orderId", orderControllers.updateOrder);
router.delete("/cart", orderControllers.clearOrderCart);
router.delete("/:orderId", orderControllers.deleteOrder);

export default router;
