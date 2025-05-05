// src/components/Navbar.jsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // assuming user object is stored as string
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    ...(token
      ? [
          { text: "Book Ride", link: "/book" },
          { text: "Profile", link: "/profile" },
          { text: "Logout", action: handleLogout },
        ]
      : [
          { text: "Login", link: "/login" },
          { text: "Register", link: "/register" },
        ]),
  ];

  const drawerList = (
    <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={item.link ? Link : "button"}
            to={item.link || undefined}
            onClick={item.action || undefined}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main", px: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}
        >
          🚖 DoDash
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              {drawerList}
            </Drawer>
          </>
        ) : (
          <Box>
            {menuItems.map((item, index) =>
              item.link ? (
                <Button
                  key={index}
                  color="inherit"
                  component={Link}
                  to={item.link}
                  sx={{ ml: 1 }}
                >
                  {item.text}
                </Button>
              ) : (
                <Button
                  key={index}
                  color="inherit"
                  onClick={item.action}
                  sx={{ ml: 1 }}
                >
                  {item.text}
                </Button>
              )
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
