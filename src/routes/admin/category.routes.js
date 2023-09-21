import { Router } from "express";
import { createCategory, getCategories } from "../../controllers/admin/category.controllers";

const router = Router();

router.post("/create", createCategory);
router.get("/getMany", getCategories);

export default router;
