"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.addProduct = exports.getSingleProduct = exports.getAllProducts = void 0;
const db_1 = require("../db");
const productValidation_1 = require("../validation/productValidation");
const getAllProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.pool.query("SELECT * FROM product");
        if (data.rowCount > 0) {
            res.json(data.rows);
            return;
        }
        res.json({ error: { message: "Table is empty" } });
    }
    catch (err) {
        res.json({ error: err });
    }
});
exports.getAllProducts = getAllProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.pool.query(`SELECT * FROM product WHERE product_id = ${req.params.id}`);
        if (data.rowCount > 0) {
            console.log("http://localhost:4000/" + data.rows[0].img_url);
            res.json(data.rows[0]);
            return;
        }
        else {
            res.json({ error: { message: "No such product" } });
        }
    }
    catch (err) {
        res.json({ error: err });
    }
});
exports.getSingleProduct = getSingleProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let productImage;
        if (!req.file) {
            productImage = `uploads\\default.png`;
        }
        else {
            productImage = req.file.path;
            console.log(req.file.path);
        }
        const Product = {
            name: req.body.name,
            description: req.body.description,
            productImage,
            amount: req.body.amount,
            category: req.body.category,
            price: req.body.price,
        };
        if (!(yield productValidation_1.productValidation(res, Product)))
            return;
        const values = [
            Product.name,
            Product.description,
            Product.productImage,
            Product.amount,
            Product.category,
            Product.price,
        ];
        yield db_1.pool.query(`INSERT INTO product (name, description, img_url, amount, category, price ) VALUES ($1,$2,$3,$4,$5,$6)`, values);
        res.json({ message: "Added product successfully" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.pool.query(`DELETE FROM product WHERE product_id = ${req.params.id}`);
        res.json({ message: "Product successfully deleted" });
    }
    catch (err) {
        res.json({ message: "No such product", error: err });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.js.map