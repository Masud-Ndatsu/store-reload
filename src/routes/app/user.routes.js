import { Router } from "express";
import userControllers from "../../controllers/app/user.controllers.js";

const router = Router();

router.get("/me", userControllers.userProfileDetails);
router.put("/me", userControllers.updateUser);
router.post("/verify-code", userControllers.verifyCustomerData);
router.post("/logout", userControllers.logoutUser);

export default router;
