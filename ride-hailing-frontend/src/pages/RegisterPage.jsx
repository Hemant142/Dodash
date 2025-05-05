import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../api/axios";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isDriver, setIsDriver] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = isDriver ? { ...form, role: "driver" } : form;

    try {
      const res = await instance.post("/auth/register", formData);
      toast.success("Registration successful! Please log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      const message =
        err.response?.data?.message || err.message || "Something went wrong!";
      toast.error(`Registration failed: ${message}`);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="85vh"
    >
      <Paper elevation={4} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          color="primary"
        >
          Create an Account
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            required
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={form.password}
            onChange={handleChange}
          />

          {/* ✅ Checkbox to register as a driver */}
          <FormControlLabel
            control={
              <Checkbox
                checked={isDriver}
                onChange={(e) => setIsDriver(e.target.checked)}
              />
            }
            label="Register as a Driver"
            sx={{ mt: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </Paper>
    </Box>
  );
};

export default RegisterPage;
