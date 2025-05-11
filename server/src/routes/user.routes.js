
import express , { Router } from "express"

const router=Router();

router.get("/user", getUsers);
router.get("/user/:userId", getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

export default router;
// import { getUsers, getUserById, registerUser, loginUser, updateUser, deleteUser } from "../controllers/user.controller.js";
