import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
    pickupLocation: {
      type: {
        lat: Number,
        lng: Number,
        display_name: String,
      },
      required: true,
    },
    dropoffLocation: {
      type: {
        lat: Number,
        lng: Number,
        display_name: String,
      },
      required: true,
    },
    fare: { type: Number, required: true },
    status: {
      type: String,
      enum: ["requested", "accepted", "in-progress", "completed", "cancelled"],
      default: "requested",
    },
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;
