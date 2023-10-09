import { Router } from "express";
import userCtrl from "../../controllers/admin/user.controllers.js";
import { upload } from "../../utils/api.utils";

const router = Router();

router.get("/", userCtrl.getAllUsers);
router.get("/:userId", userCtrl.getUser);
router.get("/me", userCtrl.getUserProfile);
router.put("/avatar", upload.array("avatar", 1), userCtrl.updateUser);

export default router;
