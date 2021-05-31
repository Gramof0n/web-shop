import { Category } from "../entities/Category";
import { getRepository } from "typeorm";
import { res } from "types";

export const categoryValidation = async (res: res, category: Category) => {
  const categoryRepository = getRepository(Category);
  const dbCategory = await categoryRepository.findOne({
    where: { category_name: category.category_name },
  });

  if (typeof dbCategory !== "undefined") {
    process.env.NODE_ENV == "test"
      ? ""
      : res.json({
          error: {
            field: "name",
            message: "Category already exists in database",
          },
        });
    return false;
  }

  return true;
};
