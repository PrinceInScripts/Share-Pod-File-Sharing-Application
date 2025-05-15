
import express , { Router } from "express"

const router=Router();
import { getUsers, getUserById, registerUser, loginUser, updateUser, deleteUser, logoutUser } from "../controllers/user.controller.js";
import authenticate from "../middlewares/auth.middlewares.js";

router.get("/user", getUsers);
router.get("/user/:userId", getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout',logoutUser)
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

export default router;
