import express from "express";
import {
  getAllUsers,
  getProfile,
  login,
  register,
  updateProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/getAllUsers", getAllUsers);
authRoutes.get("/profile/:id", verifyToken, getProfile);
authRoutes.put("/profile/:id", verifyToken, updateProfile);

export default authRoutes;
