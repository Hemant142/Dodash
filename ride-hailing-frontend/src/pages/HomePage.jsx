import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  const role = localStorage.getItem("role");
  console.log(role, "role");
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{ mt: 8, p: 5, textAlign: "center", borderRadius: 4 }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome to DoDash 🚕
        </Typography>
        <Typography variant="body1" mb={4}>
          {role === "driver"
            ? "Find passengers who need a ride and earn on the go."
            : "Book your ride quickly and easily with our reliable service."}
        </Typography>

        {role === "driver" ? (
          <Button
            component={Link}
            to="/find-rides"
            variant="outlined"
            size="large"
            color="primary"
          >
            Look for a Ride
          </Button>
        ) : (
          <Button
            component={Link}
            to="/book"
            variant="contained"
            size="large"
            color="primary"
          >
            Book a Ride Now
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;
