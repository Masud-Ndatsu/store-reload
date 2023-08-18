import { Router } from "express";
import userCtrl from "../../controllers/admin/user.controllers.js";
import { upload } from "../../utils/api.utils";

const router = Router();

router.get("/getMany", userCtrl.getAllUsers);
router.get("/getOne", userCtrl.getUser);
router.get("/avater", (req, res) => {
  const { avatar } = res.locals.user;
  return { data: avatar };
});
router.put("/avater", upload.array("avatar", 1), userCtrl.uploadUserAvatar);

export default router;
