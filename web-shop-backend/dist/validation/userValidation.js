"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const WebshopUser_1 = require("../entities/WebshopUser");
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const userValidation = async (res, User) => {
    try {
        const userRepository = typeorm_1.getRepository(WebshopUser_1.WebshopUser);
        const data = await userRepository.find();
        if (data.length === 0) {
            return true;
        }
        let dbName = await userRepository.find({ username: User.username });
        if (Object.keys(dbName).length > 0) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: { field: "username", message: "Username already exists" },
                });
            return false;
        }
        if (User.username.length === 0) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: {
                        field: "username",
                        message: "Username must not be empty",
                    },
                });
            return false;
        }
        if (User.username.length <= 3 || User.username.includes("@")) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: { field: "username", message: "Invalid username format" },
                });
            return false;
        }
        let dbMail = await userRepository.find({ email: User.email });
        if (Object.keys(dbMail).length > 0) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: { field: "email", message: "Mail already registered" },
                });
            return false;
        }
        if (constants_1.MAIL_REGEX.test(User.email) === false) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
                    error: { field: "email", message: "E-mail format not valid" },
                });
            return false;
        }
        if (User.password.length <= 3) {
            process.env.NODE_ENV == "test"
                ? ""
                : res.json({
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
};
exports.userValidation = userValidation;
//# sourceMappingURL=userValidation.js.map