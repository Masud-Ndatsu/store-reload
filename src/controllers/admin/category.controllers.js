import { CategoryService } from "../../services/admin/category.service";

export const createCategory = async (req, res, next) => {
  try {
    await CategoryService.createCategory(req.body);
    return res.status(201).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const { data } = await CategoryService.getCategories();
    return res.status(200).json({
      status: true,
      data,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
