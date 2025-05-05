import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
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
          Book your ride quickly and easily with our reliable service.
        </Typography>
        <Button
          component={Link}
          to="/book"
          variant="contained"
          size="large"
          color="primary"
        >
          Book a Ride Now
        </Button>
      </Paper>
    </Container>
  );
};

export default HomePage;
