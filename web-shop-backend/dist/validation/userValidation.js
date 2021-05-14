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
exports.userValidation = void 0;
const constants_1 = require("../constants");
const db_1 = require("../db");
const userValidation = (res, User) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbName = yield db_1.pool.query(`SELECT * FROM "user" WHERE username = '${User.username}'`);
        if (dbName.rowCount > 0) {
            console.log("Vec postoji");
            res.json({
                error: { field: "username", message: "Username already exists" },
            });
            return false;
        }
        if (User.username.length === 0) {
            res.json({
                error: { field: "username", message: "Username must not be empty" },
            });
            return false;
        }
        if (User.username.length <= 3 || User.username.includes("@")) {
            console.log("Username ne valja");
            res.json({
                error: { field: "username", message: "Invalid username format" },
            });
            return false;
        }
        let dbMail = yield db_1.pool.query(`SELECT * FROM "user" WHERE email = '${User.email}'`);
        if (dbMail.rowCount > 0) {
            res.json({
                error: { field: "email", message: "Mail already registered" },
            });
            return;
        }
        if (constants_1.MAIL_REGEX.test(User.email) === false) {
            console.log("Mail los");
            res.json({
                error: { field: "email", message: "E-mail format not valid" },
            });
            return false;
        }
        if (User.password.length <= 3) {
            console.log("Pass sranje");
            res.json({
                error: {
                    field: "password",
                    message: "Password must be greater than 3 characters",
                },
            });
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.userValidation = userValidation;
//# sourceMappingURL=userValidation.js.map