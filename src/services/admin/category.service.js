import { NotfoundError } from "../../errors";
import { Category } from "../../models/category.model";

export class CategoryService {
  static createCategory = async (categoryReq) => {
    const { name } = categoryReq;
    const category = await Category.findOne({ name }).select("_id").lean();
    if (category) throw NotfoundError("Category not found");

    await Category.create({ ...categoryReq });
    return;
  };
  static getCategories = async () => {
    const category = await Category.find({}).select("_id name").lean();
    return { data: category };
  };
}
