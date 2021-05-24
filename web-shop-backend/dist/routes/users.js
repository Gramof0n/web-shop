"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
router.get("/users", users_1.getUsers);
router.post("/users", users_1.registerUser);
router.post("/users/login", users_1.loginUser);
router.get("/users/logout", users_1.logoutUser);
router.get("/users/:id", users_1.getOneUser);
router.delete("/users/:id", users_1.deleteAUser);
router.get("/users/deactivate/:id", users_1.toggleUser);
router.get("/users/promote/:id", users_1.toggleAdminStatus);
router.get("/user/me", users_1.me);
router.put("/users/:id", users_1.updateUser);
exports.default = router;
//# sourceMappingURL=users.js.map