import { Router } from "express";
import controllers from "../../controllers/app/payment.controllers.js";

const router = Router();

router.post("/webhook", controllers.handleWebhook);

export default router;
