"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.addProduct = exports.getSingleProduct = exports.getAllProducts = void 0;
const Product_1 = require("../entities/Product");
const typeorm_1 = require("typeorm");
const productValidation_1 = require("../validation/productValidation");
const Category_1 = require("../entities/Category");
const getAllProducts = async (_, res) => {
    try {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const data = await productRepository.find({ relations: ["category"] });
        if (data.length > 0) {
            res.json(data);
            return;
        }
        res.json({ error: { message: "Table is empty" } });
    }
    catch (err) {
        res.json({ error: err });
    }
};
exports.getAllProducts = getAllProducts;
const getSingleProduct = async (req, res) => {
    try {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const data = await productRepository.findOne({
            where: { product_id: req.params.id },
            relations: ["category"],
        });
        if (Object.keys(data).length > 0) {
            res.json(data);
            return;
        }
        else {
            res.json({ error: { message: "No such product" } });
        }
    }
    catch (err) {
        res.json({ error: err });
    }
};
exports.getSingleProduct = getSingleProduct;
const addProduct = async (req, res) => {
    try {
        let productImage;
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const categoryRepository = typeorm_1.getRepository(Category_1.Category);
        if (!req.file) {
            productImage = `uploads\\default.png`;
        }
        else {
            productImage = req.file.path;
            console.log(req.file.path);
        }
        const dbCategory = await categoryRepository.findOne({
            where: { category_name: req.body.category },
        });
        if (typeof dbCategory === "undefined") {
            res.json({ error: { field: "category", message: "No such category" } });
            return;
        }
        console.log(dbCategory);
        const prod = {
            name: req.body.name,
            description: req.body.description,
            img_url: productImage,
            amount: req.body.amount,
            category: dbCategory,
            price: req.body.price,
        };
        if (!(await productValidation_1.productValidation(res, prod)))
            return;
        await productRepository.save(prod);
        res.json({ message: "Added product successfully" });
    }
    catch (err) {
        res.json(err);
    }
};
exports.addProduct = addProduct;
const deleteProduct = async (req, res) => {
    try {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        await productRepository.delete(req.params.id);
        res.json({ message: "Product successfully deleted" });
    }
    catch (err) {
        res.json({ message: "No such product", error: err });
    }
};
exports.deleteProduct = deleteProduct;
const updateProduct = async (req, res) => {
    try {
        let productImage;
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        if (!req.file) {
            productImage = `uploads\\default.png`;
        }
        else {
            productImage = req.file.path;
            console.log(req.file.path);
        }
        const prod = {
            product_id: parseInt(req.params.id),
            name: req.body.name,
            description: req.body.description,
            img_url: productImage,
            amount: req.body.amount,
            category: req.body.category,
            price: req.body.price,
        };
        await productRepository.save(prod);
        res.json({ message: "Product updated successfully" });
    }
    catch (err) {
        res.json({ message: "No such product", error: err });
    }
};
exports.updateProduct = updateProduct;
//# sourceMappingURL=products.js.map