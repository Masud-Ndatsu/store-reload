import { Router } from "express";
import authCtrl from "../../controllers/admin/auth.controllers.js";

const router = Router();

router.post("/create", authCtrl.createUser);
router.post("/login", authCtrl.loginUser);
router.post("/forgot-password", authCtrl.forgotPassword);
router.post("/new-password", authCtrl.changePassword);

export default router;
