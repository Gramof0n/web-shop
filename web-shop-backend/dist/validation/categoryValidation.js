"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const Category_1 = require("../entities/Category");
const typeorm_1 = require("typeorm");
const categoryValidation = async (res, category) => {
    const categoryRepository = typeorm_1.getRepository(Category_1.Category);
    const dbCategory = await categoryRepository.findOne({
        where: { cateogry_name: category.cateogry_name },
    });
    if (typeof dbCategory !== "undefined") {
        res.json({
            error: { field: "name", message: "Category already exists in database" },
        });
        return false;
    }
    return true;
};
exports.categoryValidation = categoryValidation;
//# sourceMappingURL=categoryValidation.js.map