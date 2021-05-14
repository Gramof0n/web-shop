"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (_, __, cb) {
        cb(null, "./uploads/");
    },
    filename: function (_, file, cb) {
        cb(null, file.originalname);
    },
});
function fileFilter(_, file, cb) {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
        return;
    }
    cb(new Error("Product image must be .jp(e)g or .png file"), false);
}
exports.upload = multer_1.default({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 8,
    },
    fileFilter,
});
//# sourceMappingURL=multer.js.map