import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch user details on mount
  useEffect(() => {
    if (!token) return;
    instance
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setFormData({ name: res.data.name, email: res.data.email });
      })
      .catch((err) => {
        console.error("Failed to fetch user profile", err);
        setUser(null);
      });
  }, [token]);

  // Update profile
  const handleUpdate = () => {
    instance
      .put("/auth/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        setEditMode(false);
      })
      .catch((err) => console.error("Update error:", err));
  };

  // If not logged in
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">
            Please log in to view your profile.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          My Profile
        </Typography>

        {!editMode ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ bgcolor: "#1976d2", width: 64, height: 64, mb: 2 }}>
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6" sx={{ mb: 1 }}>
              name: {user.name}
            </Typography>
            <Typography variant="subtitle1">Email: {user.email}</Typography>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              onClick={() => setEditMode(true)}
              sx={{ mt: 3 }}
            >
              Edit Profile
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
            />
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleUpdate}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
