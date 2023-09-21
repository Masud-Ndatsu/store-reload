import { Router } from "express";
import paymentControllers from "../../controllers/app/payment.controllers.js";

const router = Router();

router.get("/credit-card", paymentControllers.makeCreditCardPayment);
router.post("/webhook", paymentControllers.paystackWebhookHandler);

export default router;
