import { Router } from "express";
import authCtrl from "../../controllers/app/auth.controllers.js";

const router = Router();

router.post("/create", authCtrl.createUser);
router.post("/login", authCtrl.loginUser);
router.post("/reset-password-email", authCtrl.checkUserEmail);
router.post("/reset-password-otp", authCtrl.checkUserOTP);
router.post("/reset-password", authCtrl.resetPassword);

export default router;
