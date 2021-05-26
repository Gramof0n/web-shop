import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategory,
  getSingleProduct,
  updateProduct,
} from "../controllers/products";
import express from "express";
import { upload } from "../utils/multer";

const router = express.Router();

//get all products
router.get("/products", getAllProducts);

//get a single product
router.get("/products/:id", getSingleProduct);

//add a product
router.post("/products", upload.single("productImage"), addProduct);

//delete a product
router.delete("/products/:id", deleteProduct);

//update product
router.put("/products/:id", upload.single("productImage"), updateProduct);

//get by category
router.get("/products/category/:category", getProductByCategory);

export default router;
