import {
  addProductToCart,
  getUsersCart,
  removeAllFromCart,
  removeProductFromCart,
} from "../controllers/cart";
import express from "express";

const router = express.Router();

//add product to cart
router.get(
  "/cart/add/user_id=:user_id&product_id=:product_id",
  addProductToCart
);

//remove product from cart
router.get(
  "/cart/remove/user_id=:user_id&product_id=:product_id",
  removeProductFromCart
);

//get user's cart
router.get("/cart/:user_id", getUsersCart);

//remove all from cart
router.get("/cart/clear/:user_id", removeAllFromCart);

export default router;
