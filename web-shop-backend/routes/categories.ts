import {
  addCategory,
  deleteCategoryByName,
  getCategories,
} from "../controllers/categories";
import express from "express";

const router = express.Router();

//get all categories
router.get("/categories", getCategories);

//add a category
router.post("/categories", addCategory);

//delete by name
router.delete("/categories/:category_name", deleteCategoryByName);

export default router;
