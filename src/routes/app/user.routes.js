import { Router } from "express";
import controllers from "../../controllers/app/user.controllers.js";

const router = Router();

router.post("/setup", controllers.accountSetup);
router.get("/me", controllers.userProfile);
router.put("/me", controllers.updateUser);
router.get("/wallet", controllers.getWallet);
router.post("/verify-code", controllers.verifyUser);

export default router;
