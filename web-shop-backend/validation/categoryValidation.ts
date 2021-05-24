import { Category } from "../entities/Category";
import { getRepository } from "typeorm";
import { res } from "types";

export const categoryValidation = async (res: res, category: Category) => {
  const categoryRepository = getRepository(Category);
  const dbCategory = await categoryRepository.findOne({
    where: { cateogry_name: category.cateogry_name },
  });

  if (typeof dbCategory !== "undefined") {
    res.json({
      error: { field: "name", message: "Category already exists in database" },
    });
    return false;
  }

  return true;
};
