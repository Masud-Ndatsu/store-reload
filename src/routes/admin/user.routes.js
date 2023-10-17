import { Router } from "express";
import userCtrl from "../../controllers/admin/user.controllers.js";
import { upload } from "../../utils/api.utils";

const router = Router();

router.get("/", userCtrl.getAllUsers);
router.get("/messages", userCtrl.getSupportMessages);
router.get("/:user_id", userCtrl.getUser);
router.get("/me", userCtrl.getUserProfile);
router.put("/me", upload.array("avatar", 1), userCtrl.updateUser);

export default router;
