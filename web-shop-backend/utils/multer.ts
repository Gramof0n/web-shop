import multer from "multer";
import { req } from "types";

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "./uploads/");
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(_: req, file: any, cb: any) {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
    return;
  }

  cb(new Error("Product image must be .jp(e)g or .png file"), false);
}

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
  fileFilter,
});
