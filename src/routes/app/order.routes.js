import { Router } from "express";
import orderControllers from "../../controllers/app/order.controllers.js";

const router = Router();

router.post("/cart", orderControllers.addToCart);
router.post("/create", orderControllers.createOrder);
router.get("/:orderId", orderControllers.getOrder);
router.get("/cart", orderControllers.getUserCart);
router.get("/", orderControllers.getOrders);
router.put("/:orderId", orderControllers.updateOrder);
router.delete("/:orderId", orderControllers.deleteOrder);
router.delete("/cart", orderControllers.clearOrderCart);

export default router;
