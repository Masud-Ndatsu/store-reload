import { Router } from "express";
import { handleWebhook } from "../../controllers/app/payment.controllers.js";

const router = Router();

router.post("/webhook", handleWebhook);

export default router;
