import { WebshopUser } from "../entities/WebshopUser";
import { getRepository } from "typeorm";
import { res, User } from "types";
import { MAIL_REGEX } from "../constants";

export const userValidation = async (res: res, User: User) => {
  try {
    const userRepository = getRepository(WebshopUser);
    const data = await userRepository.find();

    if (data.length === 0) {
      return true;
    }

    let dbName = await userRepository.find({ username: User.username });

    if (Object.keys(dbName).length > 0) {
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

    let dbMail = await userRepository.find({ email: User.email });

    if (Object.keys(dbMail).length > 0) {
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
