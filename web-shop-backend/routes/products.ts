import {
  addProduct,
  getAllProducts,
  getSingleProduct,
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

export default router;
