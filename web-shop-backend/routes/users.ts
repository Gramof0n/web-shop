import express from "express";
import {
  deleteAUser,
  getOneUser,
  getUsers,
  loginUser,
  logoutUser,
  me,
  registerUser,
  toggleAdminStatus,
  toggleUser,
  updateUser,
} from "../controllers/users";

const router = express.Router();

//get all users
router.get("/users", getUsers);

//register a new user
router.post("/users", registerUser);

//user login
router.post("/users/login", loginUser);

//user logout
router.get("/users/logout", logoutUser);

//get a single user
router.get("/users/:id", getOneUser);

//delete a user from the db
router.delete("/users/:id", deleteAUser);

//activate or deactivate the account
router.get("/users/deactivate/:id", toggleUser);

//toggle admin status
router.get("/users/promote/:id", toggleAdminStatus);

//get user session
router.get("/user/me", me);

//edit user
router.put("/users/:id", updateUser);

export default router;
