import { Router } from "express";
import userCtrl from "../../controllers/admin/user.controllers.js";

const router = Router();

router.get("/getMany", userCtrl.getAllUsers);
router.get("/getOne", userCtrl.getUser);
router.put("/avater", userCtrl.uploadUserAvatar);

export default router;
