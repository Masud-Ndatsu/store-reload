import { AppError } from "../../errors";
import { Category } from "../../models/category.model";

export class CategoryService {
     static createCategory = async (body) => {
          const { name } = body;

          const category = await Category.findOne({ name })
               .select("_id")
               .lean();

          if (category) {
               throw new AppError("Category already exists", 400);
          }
          await new Category({
               ...body,
          }).save();

          return;
     };

     static getCategories = async () => {
          const category = await Category.aggregate([
               {
                    $match: {},
               },
          ]);

          return {
               data: category,
          };
     };
}
