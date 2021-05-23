import { pool } from "../db";
import argon2 from "argon2";
import { userValidation } from "../validation/userValidation";
import { req, res, User } from "types";
import { getRepository } from "typeorm";
import { WebshopUser } from "../entities/WebshopUser";

export const getUsers = async (_: any, res: res) => {
  const userRepository = getRepository(WebshopUser);
  const data = await userRepository.find();

  if (data.length > 0) {
    res.json(data);
  } else {
    res.json({ error: { message: "No users in database" } });
  }
};

export const registerUser = async (req: req, res: res) => {
  try {
    const userRepository = getRepository(WebshopUser);

    const User: User = {
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    if (!(await userValidation(res, User))) {
      return;
    }

    const hashedPassword = await argon2.hash(User.password);

    User.password = hashedPassword;

    await userRepository.save(User);

    const dbUser = await userRepository.findOne({ username: User.username });

    req.session.userId = dbUser?.webshop_user_id;
    req.session.isAdmin = dbUser?.is_admin;
    req.session.username = dbUser?.username;

    console.log("SETOVANO KROZ REGISTER SESIJA ", req.session);

    res.json({ message: "User successfully registered" });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req: req, res: res) => {
  try {
    const userRepository = getRepository(WebshopUser);
    const username = req.body.username;
    const password = req.body.password;

    const dbUser = await userRepository.findOne({ username: username });

    if (typeof dbUser === "undefined") {
      res.json({ error: { field: "username", message: "Invalid username" } });
      return;
    }

    if (!(await argon2.verify(dbUser.password, password))) {
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
  } catch (err) {
    res.json(err);
  }
};

export const getOneUser = async (req: req, res: res) => {
  try {
    const userRepository = getRepository(WebshopUser);
    const data = await userRepository.findOne({
      webshop_user_id: parseInt(req.params.id),
      is_deleted: false,
    });
    typeof data !== "undefined"
      ? res.json(data)
      : res.status(404).json({ message: "No such user" });
  } catch (err) {
    res.status(404).json({ message: "No such user", error: err });
  }
};

export const deleteAUser = async (req: req, res: res) => {
  try {
    const userRepository = getRepository(WebshopUser);
    await userRepository.delete({ webshop_user_id: parseInt(req.params.id) });
    res.json({ message: "User successfully deleted" });
  } catch (err) {
    res.json({ message: "No such user", error: err });
  }
};

export const toggleUser = async (req: req, res: res) => {
  //check if admin
  const userRepository = getRepository(WebshopUser);
  if (req.session.isAdmin !== true) {
    res.json({ message: "Unauthorized" });
    return;
  }

  console.log(req.session.isAdmin);

  const user = await userRepository.findOne({
    webshop_user_id: parseInt(req.params.id),
  });

  if (user?.is_deleted) {
    user.is_deleted = false;
    await userRepository.save(user);
    res.json({ message: "Account activated" });
    return;
  } else {
    user!.is_deleted = true;
    await userRepository.save(user!);
    res.json({ message: "Account deactivated" });
    return;
  }
};

export const toggleAdminStatus = async (req: req, res: res) => {
  //check if admin
  const userRepository = getRepository(WebshopUser);
  if (req.session.isAdmin !== true) {
    res.json({ message: "Unauthorized" });
    return;
  }

  const user = await userRepository.findOne({
    webshop_user_id: parseInt(req.params.id),
  });

  if (user?.is_admin) {
    user.is_admin = false;
    await userRepository.save(user);
    res.json({ message: "Admin status removed" });
    return;
  } else {
    user!.is_admin = true;
    await userRepository.save(user!);
    res.json({ message: "Admin status granted" });
    return;
  }
};

export const logoutUser = async (req: req, res: res) => {
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

export const me = async (req: req, res: res) => {
  console.log("USER ID IZ SESIJE U ME CALLU " + req.session.userId);
  if (req.session.userId !== null) {
    const User = {
      id: req.session.userId,
      username: req.session.username,
      isadmin: req.session.isAdmin,
    };

    console.log(User);

    res.json({ user: User });
  } else {
    res.json({ error: "No user session recorded" });
  }
};
