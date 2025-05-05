import express from "express";
import {
  bookRide,
  getUserRides,
  updateRideStatus,
} from "../controllers/rideController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const rideRoutes = express.Router();

rideRoutes.post("/book", verifyToken, bookRide);
rideRoutes.get("/my-rides", verifyToken, getUserRides);
rideRoutes.put("/status/:rideId", verifyToken, updateRideStatus); // Can be restricted to driver/admin if needed

export default rideRoutes;
