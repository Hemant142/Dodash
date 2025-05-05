import express from "express";
import { getAllRides, assignDriver } from "../controllers/adminController.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const adminRoutes = express.Router();

// These routes can be protected further with admin role check
adminRoutes.get("/rides", verifyToken, isAdmin, getAllRides);
adminRoutes.post("/assign-driver/:rideId", verifyToken, isAdmin, assignDriver);

export default adminRoutes;
