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
exports.default = router;
//# sourceMappingURL=products.js.map