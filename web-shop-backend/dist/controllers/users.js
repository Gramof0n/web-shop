"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.logoutUser = exports.toggleAdminStatus = exports.toggleUser = exports.updateUser = exports.deleteAUser = exports.getOneUser = exports.loginUser = exports.registerUser = exports.getUsers = void 0;
const argon2_1 = __importDefault(require("argon2"));
const userValidation_1 = require("../validation/userValidation");
const typeorm_1 = require("typeorm");
const WebshopUser_1 = require("../entities/WebshopUser");
const Cart_1 = require("../entities/Cart");
const getUsers = async (_, res) => {
    const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
    const data = await userRepository.find({ relations: ["cart"] });
    if (data.length > 0) {
        res.json(data);
    }
    else {
        res.json({ error: { message: "No users in database" } });
    }
};
exports.getUsers = getUsers;
const registerUser = async (req, res) => {
    try {
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const cartRepository = typeorm_1.getRepository(Cart_1.Cart);
        const cart = new Cart_1.Cart();
        const User = {
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            cart,
        };
        if (!(await userValidation_1.userValidation(res, User))) {
            return;
        }
        await cartRepository.save(cart);
        const hashedPassword = await argon2_1.default.hash(User.password);
        User.password = hashedPassword;
        await userRepository.save(User);
        const dbUser = await userRepository.findOne({ username: User.username }, { relations: ["cart"] });
        req.session.userId = dbUser === null || dbUser === void 0 ? void 0 : dbUser.webshop_user_id;
        req.session.isAdmin = dbUser === null || dbUser === void 0 ? void 0 : dbUser.is_admin;
        req.session.username = dbUser === null || dbUser === void 0 ? void 0 : dbUser.username;
        console.log("SETOVANO KROZ REGISTER SESIJA ", req.session);
        res.json({ message: "User successfully registered" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const username = req.body.username;
        const password = req.body.password;
        const dbUser = await userRepository.findOne({ username: username });
        if (typeof dbUser === "undefined") {
            res.json({ error: { field: "username", message: "Invalid username" } });
            return;
        }
        if (!(await argon2_1.default.verify(dbUser.password, password))) {
            res.json({ error: { field: "password", message: "Invalid password" } });
            console.log("Ne valja password");
            return;
        }
        req.session.userId = dbUser.webshop_user_id;
        req.session.isAdmin = dbUser.is_admin;
        req.session.username = dbUser.username;
        console.log("JE LI ADMIN IZ BAZE: " + dbUser.is_admin);
        console.log("SETOVANO KROZ LOGIN SESIJA ", req.session);
        res.json({ message: "Logged in" });
    }
    catch (err) {
        res.json(err);
    }
};
exports.loginUser = loginUser;
const getOneUser = async (req, res) => {
    try {
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const data = await userRepository.findOne({
            where: {
                webshop_user_id: parseInt(req.params.id),
                is_deleted: false,
            },
            relations: ["cart"],
        });
        typeof data !== "undefined"
            ? res.json(data)
            : res.status(404).json({ message: "No such user" });
    }
    catch (err) {
        res.status(404).json({ message: "No such user", error: err });
    }
};
exports.getOneUser = getOneUser;
const deleteAUser = async (req, res) => {
    try {
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const user = await userRepository.findOne({
            where: {
                webshop_user_id: parseInt(req.params.id),
            },
            lock: {
                mode: "optimistic",
                version: 1,
            },
        });
        await userRepository.delete(user.webshop_user_id);
        res.json({ message: "User successfully deleted" });
    }
    catch (err) {
        res.json({ message: "No such user", error: err });
    }
};
exports.deleteAUser = deleteAUser;
const updateUser = async (req, res) => {
    try {
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const dbUser = await typeorm_1.getRepository(WebshopUser_1.WebshopUser)
            .createQueryBuilder("webshop_user")
            .setLock("pessimistic_write")
            .useTransaction(true)
            .where(`webshop_user_id=:id`, { id: req.params.id })
            .getOne();
        (dbUser.name = req.body.name),
            (dbUser.surname = req.body.surname),
            (dbUser.username = req.body.username),
            (dbUser.email = req.body.email),
            (dbUser.password = req.body.password),
            console.log(dbUser);
        await userRepository.save(dbUser);
        res.json({ message: "User successfully updated" });
    }
    catch (err) {
        res.json({ message: "No such user", error: err });
    }
};
exports.updateUser = updateUser;
const toggleUser = async (req, res) => {
    const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
    if (req.session.isAdmin !== true) {
        res.json({ message: "Unauthorized" });
        return;
    }
    console.log(req.session.isAdmin);
    const user = await typeorm_1.getRepository(WebshopUser_1.WebshopUser)
        .createQueryBuilder("webshop_user")
        .setLock("pessimistic_write")
        .useTransaction(true)
        .where(`webshop_user_id=:id`, { id: req.params.id })
        .getOne();
    if (user === null || user === void 0 ? void 0 : user.is_deleted) {
        user.is_deleted = false;
        await userRepository.save(user);
        res.json({ message: "Account activated" });
        return;
    }
    else {
        user.is_deleted = true;
        await userRepository.save(user);
        res.json({ message: "Account deactivated" });
        return;
    }
};
exports.toggleUser = toggleUser;
const toggleAdminStatus = async (req, res) => {
    const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
    if (req.session.isAdmin !== true) {
        res.json({ message: "Unauthorized" });
        return;
    }
    const user = await typeorm_1.getRepository(WebshopUser_1.WebshopUser)
        .createQueryBuilder("webshop_user")
        .setLock("pessimistic_write")
        .useTransaction(true)
        .where(`webshop_user_id=:id`, { id: req.params.id })
        .getOne();
    if (user === null || user === void 0 ? void 0 : user.is_admin) {
        user.is_admin = false;
        await userRepository.save(user);
        res.json({ message: "Admin status successfully removed" });
        return;
    }
    else {
        user.is_admin = true;
        await userRepository.save(user);
        res.json({ message: "Admin status successfully set" });
        return;
    }
};
exports.toggleAdminStatus = toggleAdminStatus;
const logoutUser = async (req, res) => {
    new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                reject();
                return;
            }
            res.clearCookie("qid");
            resolve(res.json({ message: "Logged out" }));
        });
    });
};
exports.logoutUser = logoutUser;
const me = async (req, res) => {
    console.log("USER ID IZ SESIJE U ME CALLU " + req.session.userId);
    if (req.session.userId !== null) {
        const User = {
            id: req.session.userId,
            username: req.session.username,
            isadmin: req.session.isAdmin,
        };
        console.log(User);
        res.json({ user: User });
    }
    else {
        res.json({ error: "No user session recorded" });
    }
};
exports.me = me;
//# sourceMappingURL=users.js.map