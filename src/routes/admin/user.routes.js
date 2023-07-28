import { Router } from "express";
import authCtrl from "../../controllers/admin/user.controllers.js";

const router = Router();

router.get("/getMany", authCtrl.getAllUsers);
router.get("/getOne", authCtrl.getUser);

export default router;
