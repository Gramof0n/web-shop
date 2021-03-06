"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../controllers/products");
const express_1 = __importDefault(require("express"));
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.get("/products", products_1.getAllProducts);
router.get("/products/:id", products_1.getSingleProduct);
router.post("/products", multer_1.upload.single("productImage"), products_1.addProduct);
router.delete("/products/:id", products_1.deleteProduct);
router.put("/products/:id", multer_1.upload.single("productImage"), products_1.updateProduct);
router.get("/products/category/:category", products_1.getProductByCategory);
router.get("/product/purchase/:id", products_1.purchaseProduct);
router.get("/product/purchase-multiple", products_1.purchaseMultipleProducts);
exports.default = router;
//# sourceMappingURL=products.js.map