import Ride from "../models/Ride.js";
// import User from "../models/User.js";
// import Driver from "../models/Driver.js";

// Get all rides (for admin)
export const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate("userId", "name email")
      .populate("driverId", "name vehicleNumber");
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve rides", error });
  }
};

// Manually assign a driver to a ride
export const assignDriver = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { driverId } = req.body;

    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { driverId, status: "accepted" },
      { new: true }
    );

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    res.status(200).json({ message: "Driver assigned successfully", ride });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign driver", error });
  }
};
