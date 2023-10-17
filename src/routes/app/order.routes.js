import { Router } from "express";
import controllers from "../../controllers/app/order.controllers.js";

const router = Router();

router.get("/", controllers.getOrders);
router.post("/cart", controllers.addToCart);
router.post("/create", controllers.createOrder);
router.get("/cart", controllers.getUserCart);
router.put("/cart", controllers.updateCartItem);
router.delete("/cart", controllers.clearOrderCart);
router.get("/:orderId", controllers.getOrder);
router.delete("/:orderId", controllers.deleteOrder);

export default router;
