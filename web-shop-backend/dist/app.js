"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("reflect-metadata");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const constants_1 = require("./constants");
const cors = require("cors");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
let RedisStore = connect_redis_1.default(express_session_1.default);
let redisClient = redis_1.default.createClient();
const users_1 = __importDefault(require("./routes/users"));
const products_1 = __importDefault(require("./routes/products"));
const categories_1 = __importDefault(require("./routes/categories"));
const cart_1 = __importDefault(require("./routes/cart"));
const typeorm_1 = require("typeorm");
const WebshopUser_1 = require("./entities/WebshopUser");
const Product_1 = require("./entities/Product");
const Category_1 = require("./entities/Category");
const Cart_1 = require("./entities/Cart");
const main = async () => {
    await typeorm_1.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "webshop2",
        entities: [WebshopUser_1.WebshopUser, Product_1.Product, Category_1.Category, Cart_1.Cart],
        migrations: [path.join(__dirname, "./migrations/*")],
    });
    var app = express();
    app.listen(constants_1.PORT, () => {
        console.log("Server listening on http://localhost:" + constants_1.PORT);
    });
    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
    app.use(express_session_1.default({
        name: "qid",
        store: new RedisStore({ client: redisClient, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            sameSite: "lax",
            httpOnly: true,
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));
    app.use("/uploads", express.static("uploads"));
    app.get("/", (_, res) => {
        res.send(`<h2>User api</h2>`);
    });
    app.use("/api/v1/", users_1.default);
    app.use("/api/v1", products_1.default);
    app.use("/api/v1", categories_1.default);
    app.use("/api/v1", cart_1.default);
};
main();
exports.default = main;
//# sourceMappingURL=app.js.map