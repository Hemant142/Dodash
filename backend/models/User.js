import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["user", "driver", "admin"], default: "user" },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    isAvailable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" }); // for geo queries
export default mongoose.model("User", userSchema);
