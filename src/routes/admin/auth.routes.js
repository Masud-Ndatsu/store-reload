import { Router } from "express";
import authCtrl from "../../controllers/admin/auth.controllers.js";

const router = Router();

router.post("/register", authCtrl.createUser);
router.post("/login", authCtrl.loginUser);
router.post("/forgot-password", authCtrl.forgotPassword);
router.post("/password-change", authCtrl.changePassword);

export default router;
