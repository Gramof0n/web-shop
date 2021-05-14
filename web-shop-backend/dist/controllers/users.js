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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.logoutUser = exports.toggleAdminStatus = exports.toggleUser = exports.deleteAUser = exports.getOneUser = exports.loginUser = exports.registerUser = exports.getUsers = void 0;
const db_1 = require("../db");
const argon2_1 = __importDefault(require("argon2"));
const userValidation_1 = require("../validation/userValidation");
const getUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.pool.query(`SELECT * FROM "user" WHERE isDeleted = false`);
    if (rows !== null) {
        res.json(rows);
    }
    else {
        res.json({ error: "no users" });
    }
});
exports.getUsers = getUsers;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const User = {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };
    if (!(yield userValidation_1.userValidation(res, User))) {
        return;
    }
    const hashedPassword = yield argon2_1.default.hash(User.password);
    const values = [
        User.name,
        User.surname,
        User.username,
        hashedPassword,
        User.email,
    ];
    yield db_1.pool.query('INSERT INTO "user"(name, surname, username, password, email) VALUES ($1,$2,$3,$4,$5)', values);
    const dbUser = yield db_1.pool.query(`
    SELECT * FROM "user" WHERE username = '${values[2]}'
  `);
    req.session.userId = dbUser.rows[0].user_id;
    req.session.isAdmin = dbUser.rows[0].isadmin;
    req.session.username = dbUser.rows[0].username;
    console.log("SETOVANO KROZ REGISTER SESIJA ", req.session);
    res.json({ message: "User successfully registered" });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const dbUser = yield db_1.pool.query(`SELECT * FROM "user" WHERE username = '${username}'`);
        if (dbUser.rowCount === 0) {
            res.json({ error: { field: "username", message: "Invalid username" } });
            return;
        }
        if (!(yield argon2_1.default.verify(dbUser.rows[0].password, password))) {
            res.json({ error: { field: "password", message: "Invalid password" } });
            console.log("Ne valja password");
            return;
        }
        req.session.userId = dbUser.rows[0].user_id;
        req.session.isAdmin = dbUser.rows[0].isadmin;
        req.session.username = dbUser.rows[0].username;
        console.log("SETOVANO KROZ LOGIN SESIJA ", req.session);
        res.json({ message: "Logged in" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.loginUser = loginUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.pool.query(`SELECT * FROM "user" WHERE user_id = ${req.params.id} AND isDeleted = false`);
        data.rowCount > 0
            ? res.json(data.rows[0])
            : res.status(404).json({ message: "No such user" });
    }
    catch (err) {
        res.status(404).json({ message: "No such user", error: err });
    }
});
exports.getOneUser = getOneUser;
const deleteAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.pool.query(`DELETE FROM "user" WHERE user_id = ${req.params.id}`);
        res.json({ message: "User successfully deleted" });
    }
    catch (err) {
        res.json({ message: "No such user", error: err });
    }
});
exports.deleteAUser = deleteAUser;
const toggleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.isAdmin !== true) {
        res.json({ message: "Unauthorized" });
        return;
    }
    console.log(req.session.isAdmin);
    const user = yield db_1.pool.query(`SELECT * FROM "user" WHERE isDeleted = false AND user_id = ${req.params.id}`);
    if (user.rowCount < 1) {
        yield db_1.pool.query(`UPDATE "user" SET isDeleted = false WHERE user_id = ${req.params.id}`);
        res.json({ message: "Account activated" });
        return;
    }
    else {
        yield db_1.pool.query(`UPDATE "user" SET isDeleted = true WHERE user_id = ${req.params.id}`);
        res.json({ message: "Account deactivated" });
        return;
    }
});
exports.toggleUser = toggleUser;
const toggleAdminStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.isAdmin !== true) {
        res.json({ message: "Unauthorized" });
        return;
    }
    try {
        const user = yield db_1.pool.query(`SELECT * FROM "user" WHERE user_id = ${req.params.id} AND isAdmin = false`);
        if (user.rowCount !== 0) {
            yield db_1.pool.query(`UPDATE "user" SET isAdmin = true WHERE user_id = ${req.params.id}`);
            res.json({ message: "Admin status successfully set" });
            return;
        }
        else {
            yield db_1.pool.query(`UPDATE "user" SET isAdmin = false WHERE user_id = ${req.params.id}`);
            res.json({ message: "Admin status successfully removed" });
            return;
        }
    }
    catch (err) { }
});
exports.toggleAdminStatus = toggleAdminStatus;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.logoutUser = logoutUser;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.me = me;
//# sourceMappingURL=users.js.map