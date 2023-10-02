import { Router } from "express";
import authCtrl from "../../controllers/app/auth.controllers.js";

const router = Router();

router.post("/register", authCtrl.createUser);
router.post("/login", authCtrl.loginUser);
router.post("/reset-password", authCtrl.checkUserEmail);
router.post("/reset-password-verify-code", authCtrl.checkUserOTP);
router.post("/reset-password-change", authCtrl.resetPassword);

export default router;
