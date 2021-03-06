import { Category } from "../entities/Category";
import { getRepository } from "typeorm";
import { req, res } from "types";
import { categoryValidation } from "../validation/categoryValidation";

export const getCategories = async (_: req, res: res) => {
  try {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.find();

    if (category.length === 0) {
      res.json({ error: { message: "Table is empty" } });
      return;
    }

    res.json(category);
  } catch (err) {
    res.json({ error: err });
  }
};

export const addCategory = async (req: req, res: res) => {
  try {
    const categoryRepository = getRepository(Category);

    const category: Category = {
      category_name: req.body.name,
    };

    if (!(await categoryValidation(res, category))) {
      return;
    }

    await categoryRepository.save(category);
    res.json({ message: "Successfully added a new category", category });
  } catch (err) {
    res.json({ error: err });
  }
};

//delete by name
export const deleteCategoryByName = async (req: req, res: res) => {
  try {
    const categoryRepository = getRepository(Category);
    const dbCategory = await categoryRepository.findOne({
      where: { category_name: req.params.category_name },
    });

    await categoryRepository.remove(dbCategory!);

    res.json({ message: "Category successfully deleted" });
  } catch (err) {
    res.json({ error: { field: "", message: "No such category exists" } });
  }
};
