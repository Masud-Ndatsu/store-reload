import { Router } from "express";
import orderControllers from "../../controllers/app/order.controllers.js";

const router = Router();

router.post("/add-to-cart", orderControllers.addToCart);
router.post("/create", orderControllers.createOrder);
router.get("/getOne", orderControllers.getOrder);
router.get("/get-user-cart", orderControllers.getUserCart);
router.get("/get-orders", orderControllers.getOrdersPlaced);
router.put("/update", orderControllers.updateOrder);
router.delete("/delete", orderControllers.deleteOrder);
router.delete("/delete-all", orderControllers.clearOrderCart);

export default router;
