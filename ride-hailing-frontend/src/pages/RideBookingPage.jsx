import { useState } from "react";
import MapSelector from "../components/MapSelector";
import LocationSearchInput from "../components/LocationSearchInput";
import { Box, Typography, Paper, Grid, Divider, Button } from "@mui/material";
import { bookRide } from "../api/bookRide";

const RideBookingPage = () => {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const token = localStorage.getItem("token");
  const calculateFare = (start, end) => {
    const distanceInKm = getDistanceInKm(start, end); // implement with haversine formula or Google API
    return Math.max(50, Math.round(distanceInKm * 15)); // min fare ₹50, ₹15/km
  };

  const getDistanceInKm = (start, end) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(end.lat - start.lat);
    const dLng = deg2rad(end.lng - start.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(start.lat)) *
        Math.cos(deg2rad(end.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // in kilometers
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleConfirmRide = () => {
    console.log("Confirmed ride from", pickup, "to", drop);
    // Send to backend here

    const fare = calculateFare(pickup, drop); // define as needed
    console.log(fare, "fare");
    bookRide({
      pickupAddress: pickup,
      dropoffAddress: drop,
      fare,
      token,
      // driverId: "64f123abc456...", // real or dummy driver ID
    });
  };

  return (
    <Box
      p={{ xs: 2, md: 5 }}
      sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom color="#244c9c">
        🚖 Book Your Ride
      </Typography>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <LocationSearchInput
              label="Pickup Location"
              onSelectLocation={setPickup}
              isPickup
            />
            {pickup && (
              <Typography variant="body2" color="text.secondary" mt={1}>
                📍 {pickup.display_name}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <LocationSearchInput
              label="Drop-off Location"
              onSelectLocation={setDrop}
            />
            {drop && (
              <Typography variant="body2" color="text.secondary" mt={1}>
                🏁 {drop.display_name}
              </Typography>
            )}
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mt={1}
            >
              👆 Or click on the map to set drop-off location
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ mb: 2 }} />

      <MapSelector pickup={pickup} drop={drop} setDrop={setDrop} />

      <Box mt={3} display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={{ backgroundColor: "#244c9c", px: 4, py: 1.5 }}
          onClick={handleConfirmRide}
          disabled={!pickup || !drop}
        >
          Confirm Ride
        </Button>
      </Box>
    </Box>
  );
};

export default RideBookingPage;
