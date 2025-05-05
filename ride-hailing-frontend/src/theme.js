// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d47a1", // Deep Blue
    },
    secondary: {
      main: "#ff9800", // Orange
    },
    background: {
      default: "#f5f7fa", // Light gray background
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
});

export default theme;
