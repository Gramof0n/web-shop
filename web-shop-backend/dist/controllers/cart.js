"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllFromCart = exports.removeProductFromCart = exports.addProductToCart = exports.getUsersCart = void 0;
const Cart_1 = require("../entities/Cart");
const Product_1 = require("../entities/Product");
const WebshopUser_1 = require("../entities/WebshopUser");
const typeorm_1 = require("typeorm");
const getUsersCart = async (req, res) => {
    try {
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const cartRepository = typeorm_1.getRepository(Cart_1.Cart);
        const dbUser = await userRepository.findOne({
            where: { webshop_user_id: req.params.user_id },
        });
        const dbCart = await cartRepository.findOne({
            relations: ["user", "products"],
            where: { user: dbUser },
        });
        if (Object.keys(dbCart).length === 0) {
            throw new Error();
        }
        res.json(dbCart);
    }
    catch (err) {
        res.json({ error: { message: "No such user" } });
    }
};
exports.getUsersCart = getUsersCart;
const addProductToCart = async (req, res) => {
    try {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const cartRepository = typeorm_1.getRepository(Cart_1.Cart);
        const dbProduct = await productRepository
            .createQueryBuilder("product")
            .setLock("pessimistic_write")
            .useTransaction(true)
            .where("product_id=:id", { id: req.params.product_id })
            .getOne();
        const dbUser = await userRepository.findOne({
            where: { webshop_user_id: req.params.user_id },
        });
        const dbCart = await cartRepository.findOne({
            relations: ["user", "products"],
            where: { user: dbUser },
        });
        for (let p of dbCart === null || dbCart === void 0 ? void 0 : dbCart.products) {
            console.table({ product: p, DataBaseProduct: dbProduct });
            if (p.product_id === (dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.product_id)) {
                res.json({
                    error: { field: "exists", message: "Product already in cart" },
                });
                return;
            }
        }
        dbCart === null || dbCart === void 0 ? void 0 : dbCart.products.push(dbProduct);
        let total_price = 0;
        for (let p of dbCart === null || dbCart === void 0 ? void 0 : dbCart.products) {
            total_price += p.price;
        }
        dbCart.total_price = total_price;
        await cartRepository.save(dbCart);
        res.json({ message: "Product successfully added to cart", cart: dbCart });
    }
    catch (err) {
        res.json({ error: err });
    }
};
exports.addProductToCart = addProductToCart;
const removeProductFromCart = async (req, res) => {
    try {
        const productRepository = typeorm_1.getRepository(Product_1.Product);
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const cartRepository = typeorm_1.getRepository(Cart_1.Cart);
        const dbProduct = await productRepository.findOne({
            where: { product_id: req.params.product_id },
        });
        const dbUser = await userRepository.findOne({
            where: { webshop_user_id: req.params.user_id },
        });
        const dbCart = await cartRepository.findOne({
            relations: ["user", "products"],
            where: { user: dbUser },
        });
        if (dbCart.products.length === 0) {
            res.json({ error: { field: "empty", message: "Cart is empty" } });
            return;
        }
        const id = dbCart.products.find((product) => product.product_id === dbProduct.product_id);
        if (typeof id === "undefined") {
            res.json({
                error: { field: "no_product", message: "No such product in cart" },
            });
            return;
        }
        dbCart.products = dbCart.products.filter((product, _) => {
            console.table({
                FilterProductId: product.product_id,
                DbProductId: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.product_id,
            });
            return product.product_id !== dbProduct.product_id;
        });
        let total_price = 0;
        for (let p of dbCart === null || dbCart === void 0 ? void 0 : dbCart.products) {
            total_price += p.price;
        }
        dbCart.total_price = total_price;
        await cartRepository.save(dbCart);
        res.json({ message: "Product removed", cart: dbCart });
    }
    catch (err) {
        res.json({ error: err });
    }
};
exports.removeProductFromCart = removeProductFromCart;
const removeAllFromCart = async (req, res) => {
    try {
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const cartRepository = typeorm_1.getRepository(Cart_1.Cart);
        const dbUser = await userRepository.findOne({
            where: { webshop_user_id: req.params.user_id },
        });
        const dbCart = await cartRepository.findOne({
            relations: ["user", "products"],
            where: { user: dbUser },
        });
        if (dbCart.products.length === 0) {
            res.json({ error: { field: "empty", message: "Cart is empty" } });
            return;
        }
        dbCart.products = [];
        dbCart.total_price = 0;
        await cartRepository.save(dbCart);
        res.json({ message: "Cart cleared", cart: dbCart });
    }
    catch (err) {
        res.json({ error: err });
    }
};
exports.removeAllFromCart = removeAllFromCart;
//# sourceMappingURL=cart.js.map