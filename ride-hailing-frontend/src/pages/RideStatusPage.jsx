import React from "react";
import { Box, Typography, Paper, Button, Avatar, Divider } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const RideStatusPage = () => {
  const rideId = "123456"; // Replace with real ID from params in a full app

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Ride ID: {rideId}
      </Typography>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: "primary.main" }}>D</Avatar>
          <Box>
            <Typography variant="h6">Driver: Ramesh Kumar</Typography>
            <Typography variant="body2" color="text.secondary">
              Vehicle: Yamaha FZ | DL 01 AB 1234
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

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="error">
            Cancel Ride
          </Button>
          <Button variant="contained" color="primary">
            Mark as Complete
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RideStatusPage;
