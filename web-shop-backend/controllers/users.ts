import { pool } from "../db";
import argon2 from "argon2";
import { userValidation } from "../validation/userValidation";
import { req, res } from "types";

export const getUsers = async (_: any, res: res) => {
  const { rows } = await pool.query(
    `SELECT * FROM "user" WHERE isDeleted = false`
  );

  if (rows !== null) {
    res.json(rows);
  } else {
    res.json({ error: "no users" });
  }
};

export const registerUser = async (req: req, res: res) => {
  const User = {
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

  const values = [
    User.name,
    User.surname,
    User.username,
    hashedPassword,
    User.email,
  ];

  await pool.query(
    'INSERT INTO "user"(name, surname, username, password, email) VALUES ($1,$2,$3,$4,$5)',
    values
  );

  const dbUser = await pool.query(`
    SELECT * FROM "user" WHERE username = '${values[2]}'
  `);

  req.session.userId = dbUser.rows[0].user_id;
  req.session.isAdmin = dbUser.rows[0].isadmin;
  req.session.username = dbUser.rows[0].username;

  console.log("SETOVANO KROZ REGISTER SESIJA ", req.session);

  res.json({ message: "User successfully registered" });
};

export const loginUser = async (req: req, res: res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const dbUser = await pool.query(
      `SELECT * FROM "user" WHERE username = '${username}'`
    );

    if (dbUser.rowCount === 0) {
      res.json({ error: { field: "username", message: "Invalid username" } });
      return;
    }

    if (!(await argon2.verify(dbUser.rows[0].password, password))) {
      res.json({ error: { field: "password", message: "Invalid password" } });
      console.log("Ne valja password");
      return;
    }

    req.session.userId = dbUser.rows[0].user_id;
    req.session.isAdmin = dbUser.rows[0].isadmin;
    req.session.username = dbUser.rows[0].username;

    console.log("SETOVANO KROZ LOGIN SESIJA ", req.session);

    res.json({ message: "Logged in" });
  } catch (err) {
    res.json(err);
  }
};

export const getOneUser = async (req: req, res: res) => {
  try {
    const data = await pool.query(
      `SELECT * FROM "user" WHERE user_id = ${req.params.id} AND isDeleted = false`
    );
    data.rowCount > 0
      ? res.json(data.rows[0])
      : res.status(404).json({ message: "No such user" });
  } catch (err) {
    res.status(404).json({ message: "No such user", error: err });
  }
};

export const deleteAUser = async (req: req, res: res) => {
  try {
    await pool.query(`DELETE FROM "user" WHERE user_id = ${req.params.id}`);
    res.json({ message: "User successfully deleted" });
  } catch (err) {
    res.json({ message: "No such user", error: err });
  }
};

export const toggleUser = async (req: req, res: res) => {
  //check if admin
  if (req.session.isAdmin !== true) {
    res.json({ message: "Unauthorized" });
    return;
  }

  console.log(req.session.isAdmin);

  const user = await pool.query(
    `SELECT * FROM "user" WHERE isDeleted = false AND user_id = ${req.params.id}`
  );

  if (user.rowCount < 1) {
    await pool.query(
      `UPDATE "user" SET isDeleted = false WHERE user_id = ${req.params.id}`
    );
    res.json({ message: "Account activated" });
    return;
  } else {
    await pool.query(
      `UPDATE "user" SET isDeleted = true WHERE user_id = ${req.params.id}`
    );
    res.json({ message: "Account deactivated" });
    return;
  }
};

export const toggleAdminStatus = async (req: req, res: res) => {
  //check if admin
  if (req.session.isAdmin !== true) {
    res.json({ message: "Unauthorized" });
    return;
  }

  try {
    const user = await pool.query(
      `SELECT * FROM "user" WHERE user_id = ${req.params.id} AND isAdmin = false`
    );

    if (user.rowCount !== 0) {
      await pool.query(
        `UPDATE "user" SET isAdmin = true WHERE user_id = ${req.params.id}`
      );

      res.json({ message: "Admin status successfully set" });
      return;
    } else {
      await pool.query(
        `UPDATE "user" SET isAdmin = false WHERE user_id = ${req.params.id}`
      );
      res.json({ message: "Admin status successfully removed" });
      return;
    }
  } catch (err) {}
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
