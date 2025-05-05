// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", user.name);
      localStorage.setItem("role", user.role);
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong!";
      toast.error(`Login failed: ${message}`);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      px={2}
    >
      <Paper
        elevation={4}
        sx={{
          p: isSmallScreen ? 3 : 5,
          width: isSmallScreen ? "100%" : 400,
          borderRadius: 3,
          maxWidth: "100%",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          color="primary"
          fontWeight="bold"
        >
          Welcome Back
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </form>
      </Paper>

      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};

export default LoginPage;
