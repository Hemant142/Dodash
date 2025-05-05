import React, { useState } from "react";
import { Box, Typography, Paper, Button, Avatar, Divider } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const RideStatusPage = () => {
  const [rideStatus, setRideStatus] = useState("confirmed"); // confirmed, completed
  const [driverInfo, setDriverInfo] = useState({
    name: "Ramesh Kumar",
    vehicle: "Yamaha FZ",
    vehicleNumber: "DL 01 AB 1234",
  });
  const rideId = "123456"; // Replace with real ID from params in a full app

  const handleCancelRide = () => {
    setRideStatus("cancelled");
  };

  const handleCompleteRide = () => {
    setRideStatus("completed");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Ride ID: {rideId}
      </Typography>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: "primary.main" }}>D</Avatar>
          <Box>
            <Typography variant="h6">Driver: {driverInfo.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Vehicle: {driverInfo.vehicle} | {driverInfo.vehicleNumber}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" gap={2} alignItems="center">
          <LocationOnIcon color="error" />
          <Typography>Pickup: Connaught Place</Typography>
        </Box>
        <Box display="flex" gap={2} alignItems="center" mt={1}>
          <LocationOnIcon color="success" />
          <Typography>Drop: Gurgaon Cyber Hub</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            height: "200px",
            borderRadius: 2,
            overflow: "hidden",
            background: "#e3f2fd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary">
            Live Ride Map Placeholder
          </Typography>
        </Box>

        {rideStatus === "confirmed" && (
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="error" onClick={handleCancelRide}>
              Cancel Ride
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompleteRide}
            >
              Mark as Complete
            </Button>
          </Box>
        )}

        {rideStatus === "cancelled" && (
          <Typography color="error" mt={3}>
            Ride has been cancelled.
          </Typography>
        )}

        {rideStatus === "completed" && (
          <Typography color="success.main" mt={3}>
            Ride Completed Successfully!
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RideStatusPage;
