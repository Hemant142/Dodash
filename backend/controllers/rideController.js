import Ride from "../models/Ride.js";
import User from "../models/User.js";

// Book a Ride
export const bookRide = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, fare, driverId } = req.body;

    const ride = new Ride({
      userId: req.userId,
      driverId,
      pickupLocation,
      dropoffLocation,
      fare,
      status: "requested",
    });
    console.log(ride, "Ride");
    await ride.save();
    res.status(201).json({ message: "Ride booked", ride });
  } catch (error) {
    res.status(500).json({ message: "Ride booking failed", error });
  }
};

// Get All Rides for User
export const getUserRides = async (req, res) => {
  try {
    const rides = await Ride.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rides", error });
  }
};

// Update Ride Status (Admin or Driver)
export const updateRideStatus = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { status } = req.body;

    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { status },
      { new: true }
    );

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    res.status(200).json({ message: "Ride status updated", ride });
  } catch (error) {
    res.status(500).json({ message: "Failed to update ride", error });
  }
};
