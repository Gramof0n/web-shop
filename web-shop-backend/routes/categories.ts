import { addCategory, getCategories } from "../controllers/categories";
import express from "express";

const router = express.Router();

//get all categories
router.get("/categories", getCategories);

//add a category
router.post("/categories", addCategory);

export default router;
