"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const Product_1 = require("../entities/Product");
const typeorm_1 = require("typeorm");
const productValidation = async (res, Prod) => {
    try {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const data = await productRepository.find();
        if (data.length === 0) {
            return true;
        }
        const dbProduct = await productRepository.find({
            name: Prod.name,
            category: Prod.category,
        });
        console.log(dbProduct);
        if (Object.keys(dbProduct).length > 0) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({ error: { message: "Item already in database" } });
            return false;
        }
        if (!Prod.name || Prod.name.length === 0) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: { field: "name", message: "Name must not be empty" },
                });
            return false;
        }
        if (!Prod.description || Prod.description.length === 0) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: {
                        field: "description",
                        message: "Description must not be empty",
                    },
                });
            return false;
        }
        if (!Prod.category || Prod.category.length === 0) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: { field: "category", message: "Category must not be empty" },
                });
            return false;
        }
        if (!Prod.price) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: {
                        field: "price",
                        message: "Price must not be empty",
                    },
                });
            return false;
        }
        else if (isNaN(Prod.price)) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: {
                        field: "price",
                        message: "Price must be numeric",
                    },
                });
            return false;
        }
        else if (Prod.price < 0) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: {
                        field: "price",
                        message: "Price must be positive",
                    },
                });
            return false;
        }
        if (!Prod.amount) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: {
                        field: "amount",
                        message: "Amount must not be empty",
                    },
                });
            return false;
        }
        else if (isNaN(Prod.amount)) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: {
                        field: "amount",
                        message: "Amount must be numeric",
                    },
                });
            return false;
        }
        else if (Prod.amount < 0) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: {
                        field: "amount",
                        message: "Amount must be positive",
                    },
                });
            return false;
        }
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.productValidation = productValidation;
//# sourceMappingURL=productValidation.js.map