import { ServiceError } from "../../errors";
import { Category } from "../../models/category.model";

export class CategoryService {
    static createCategory = async (categoryReq) => {
        const { name } = categoryReq;

        const category = await Category.findOne({ name }).select("_id").lean();

        if (category) throw new ServiceError("Category already exists");

        await Category.create({ ...categoryReq });
        return;
    };
    static getCategories = async () => {
        const category = await Category.find({}).lean();
        return { data: category };
    };
}
