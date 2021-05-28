"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../controllers/cart");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/cart/add/user_id=:user_id&product_id=:product_id", cart_1.addProductToCart);
router.get("/cart/remove/user_id=:user_id&product_id=:product_id", cart_1.removeProductFromCart);
router.get("/cart/:user_id", cart_1.getUsersCart);
router.get("/cart/clear/:user_id", cart_1.removeAllFromCart);
exports.default = router;
//# sourceMappingURL=cart.js.map