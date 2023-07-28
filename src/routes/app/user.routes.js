import { Router } from "express";
import userControllers from "../../controllers/app/user.controllers.js";

const router = Router();

router.get("/my-profile", userControllers.userProfileDetails);
router.put("/update", userControllers.updateUser);
router.post("/verify-email", userControllers.verifyUserEmail);
router.get("/logout", userControllers.logoutUser);

export default router;
