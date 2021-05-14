import { res, User } from "types";
import { MAIL_REGEX } from "../constants";
import { pool } from "../db";

export const userValidation = async (res: res, User: User) => {
  try {
    let dbName = await pool.query(
      `SELECT * FROM "user" WHERE username = '${User.username}'`
    );

    if (dbName.rowCount > 0) {
      //console.log("Vec postoji");
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
      //console.log("Username ne valja");
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: { field: "username", message: "Invalid username format" },
          });
      return false;
    }

    let dbMail = await pool.query(
      `SELECT * FROM "user" WHERE email = '${User.email}'`
    );

    if (dbMail.rowCount > 0) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: { field: "email", message: "Mail already registered" },
          });
      return false;
    }
    if (MAIL_REGEX.test(User.email) === false) {
      //console.log("Mail los");
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: { field: "email", message: "E-mail format not valid" },
          });
      return false;
    }

    if (User.password.length <= 3) {
      //console.log("Pass ne valja");
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
  } catch (error) {
    return false;
  }
};
