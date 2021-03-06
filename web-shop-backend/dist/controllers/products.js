"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseMultipleProducts = exports.purchaseProduct = exports.getProductByCategory = exports.updateProduct = exports.deleteProduct = exports.addProduct = exports.getSingleProduct = exports.getAllProducts = void 0;
const Product_1 = require("../entities/Product");
const typeorm_1 = require("typeorm");
const productValidation_1 = require("../validation/productValidation");
const Category_1 = require("../entities/Category");
const pagination_1 = require("../utils/pagination");
const getAllProducts = async (req, res) => {
    try {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const searchTerm = typeof req.query.search_term !== "undefined"
            ? req.query.search_term
            : "%";
        const count = await productRepository.count({
            where: { name: typeorm_1.ILike(`%${searchTerm}%`) },
        });
        const [pagination_data, take, skip] = pagination_1.pagination(req.query.page, count);
        console.log("Search term: " + searchTerm);
        const data = await productRepository.find({
            relations: ["category", "carts"],
            where: { name: typeorm_1.ILike(`%${searchTerm}%`) },
            skip: skip,
            take: take,
        });
        if (data.length > 0) {
            res.json({ found: count, pagination_data, products: data });
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
            relations: ["category", "carts"],
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
        const categoryRepository = typeorm_1.getRepository(Category_1.Category);
        const dbCategory = await categoryRepository.findOne({
            where: { category_name: req.body.category },
        });
        if (typeof dbCategory === "undefined") {
            res.json({
                error: { field: "category", message: "No such category" },
            });
            return;
        }
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
            category: dbCategory,
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
const getProductByCategory = async (req, res) => {
    try {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const categoryRepository = typeorm_1.getRepository(Category_1.Category);
        const dbCategory = await categoryRepository.findOne({
            where: { category_name: req.params.category },
        });
        if (typeof dbCategory === "undefined") {
            res.json({
                error: { field: "category", message: "No such category" },
            });
            return;
        }
        const searchTerm = typeof req.query.search_term !== "undefined"
            ? req.query.search_term
            : "%";
        const count = await productRepository.count({
            where: { category: dbCategory, name: typeorm_1.ILike(`%${searchTerm}%`) },
        });
        const [pagination_data, take, skip] = pagination_1.pagination(req.query.page, count);
        const product = await productRepository.find({
            where: { category: dbCategory, name: typeorm_1.ILike(`%${searchTerm}%`) },
            relations: ["category"],
            skip,
            take,
        });
        if (product.length === 0) {
            res.json({
                error: { field: "category", message: "No products for this category" },
            });
            return;
        }
        res.json({ found: count, pagination_data, products: product });
    }
    catch (err) {
        res.json({ error: err });
    }
};
exports.getProductByCategory = getProductByCategory;
const purchaseProduct = async (req, res) => {
    try {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const dbProduct = await productRepository
            .createQueryBuilder("product")
            .setLock("pessimistic_write")
            .useTransaction(true)
            .where("product_id= :id", { id: req.params.id })
            .getOne();
        dbProduct.amount -= 1;
        await productRepository.save(dbProduct);
        res.json({
            message: "Transaction complete, item purchased",
            product: dbProduct,
        });
    }
    catch (err) {
        res.json({
            error: {
                field: "",
                message: "Something went wrong, try again later",
                error: err,
            },
        });
    }
};
exports.purchaseProduct = purchaseProduct;
const purchaseMultipleProducts = async (req, res) => {
    var _a;
    try {
        const ids = (_a = req.query.ids) === null || _a === void 0 ? void 0 : _a.toString().split(",").map((id) => parseInt(id));
        console.log("IDS: " + ids);
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const dbProducts = await productRepository
            .createQueryBuilder("product")
            .setLock("pessimistic_write")
            .useTransaction(true)
            .where("product_id IN (:...ids)", { ids: ids })
            .getMany();
        dbProducts.map((prod) => (prod.amount -= 1));
        await productRepository.save(dbProducts);
        res.json({
            message: "Transaction complete, items purchased",
            products: dbProducts,
        });
    }
    catch (err) {
        res.json({
            error: {
                field: "",
                message: "Something went wrong, try again later",
                error: err,
            },
        });
    }
};
exports.purchaseMultipleProducts = purchaseMultipleProducts;
//# sourceMappingURL=products.js.map