import { Router } from "express";
import controllers from "../../controllers/app/order.controllers.js";

const router = Router();

router.get("/", controllers.getOrders);
router.post("/create", controllers.createOrder);
router.get("/:order_id", controllers.getOrder);
router.delete("/:order_id", controllers.deleteOrder);
router.post("/cart", controllers.addToCart);
router.get("/cart", controllers.getUserCart);
router.put("/cart", controllers.updateCartItem);
router.delete("/cart", controllers.clearOrderCart);

export default router;
