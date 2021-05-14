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
exports.productValidation = void 0;
const db_1 = require("../db");
const productValidation = (res, Product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { rowCount } = yield db_1.pool.query(`SELECT * FROM product`);
        if (rowCount !== 0) {
            console.log("IMA U BAZI NESTO " + rowCount);
            const dbProduct = yield db_1.pool.query(`SELECT * FROM product WHERE name = '${Product.name}' AND category = '${Product.category}'`);
            if (dbProduct.rowCount > 0) {
                res.json({ error: { message: "Item already in database" } });
                return false;
            }
        }
        if (!Product.name || Product.name.length === 0) {
            console.log("Ime prazno");
            res.json({ error: { field: "name", message: "Name must not be empty" } });
            return false;
        }
        if (!Product.description || Product.description.length === 0) {
            res.json({
                error: {
                    field: "description",
                    message: "Description must not be empty",
                },
            });
            return false;
        }
        if (!Product.category || Product.category.length === 0) {
            console.log("Kategorija prazna");
            res.json({
                error: { field: "category", message: "Category must not be empty" },
            });
            return false;
        }
        if (!Product.price) {
            res.json({
                error: {
                    field: "price",
                    message: "Price must not be empty",
                },
            });
            return false;
        }
        else if (isNaN(Product.price)) {
            res.json({
                error: {
                    field: "price",
                    message: "Price must be numeric",
                },
            });
            return false;
        }
        else if (Product.price < 0) {
            res.json({
                error: {
                    field: "price",
                    message: "Price must be positive",
                },
            });
            return false;
        }
        if (!Product.amount) {
            res.json({
                error: {
                    field: "amount",
                    message: "Amount must not be empty",
                },
            });
            return false;
        }
        else if (isNaN(Product.amount)) {
            res.json({
                error: {
                    field: "amount",
                    message: "Amount must be numeric",
                },
            });
            return false;
        }
        else if (Product.amount < 0) {
            res.json({
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
        res.json({ error: err });
        return false;
    }
});
exports.productValidation = productValidation;
//# sourceMappingURL=productValidation.js.map