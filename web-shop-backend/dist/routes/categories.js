"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = require("../controllers/categories");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/categories", categories_1.getCategories);
router.post("/categories", categories_1.addCategory);
router.delete("/categories/:category_name", categories_1.deleteCategoryByName);
exports.default = router;
//# sourceMappingURL=categories.js.map