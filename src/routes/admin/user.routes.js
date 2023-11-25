import { Router } from "express";
import {
     getCustomer,
     getCustomerSupport,
     getCustomers,
     getProfile,
     replySupportMessages,
     updateProfile,
} from "../../controllers/admin/user.controllers.js";
import { upload } from "../../utils/api.utils";

const router = Router();

router.get("/", getCustomers);
router.get("/messages", getCustomerSupport);
router.get("/:user_id", getCustomer);
router.get("/me", getProfile);
router.put("/me", upload.array("avatar", 1), updateProfile);
router.put("/messages/:support_id", replySupportMessages);

export default router;
