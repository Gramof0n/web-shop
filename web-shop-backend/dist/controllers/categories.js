"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = exports.getCategories = void 0;
const Category_1 = require("../entities/Category");
const typeorm_1 = require("typeorm");
const categoryValidation_1 = require("../validation/categoryValidation");
const getCategories = async (_, res) => {
    try {
        const categoryRepository = typeorm_1.getRepository(Category_1.Category);
        const category = await categoryRepository.find();
        if (category.length === 0) {
            res.json({ error: { message: "Table is empty" } });
            return;
        }
        res.json(category);
    }
    catch (err) {
        res.json({ error: err });
    }
};
exports.getCategories = getCategories;
const addCategory = async (req, res) => {
    try {
        const categoryRepository = typeorm_1.getRepository(Category_1.Category);
        const category = {
            category_name: req.body.name,
        };
        if (!(await categoryValidation_1.categoryValidation(res, category))) {
            return;
        }
        await categoryRepository.save(category);
        res.json({ message: "Successfully added a new category", category });
    }
    catch (err) {
        res.json({ error: err });
    }
};
exports.addCategory = addCategory;
//# sourceMappingURL=categories.js.map