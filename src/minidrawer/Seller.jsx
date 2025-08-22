import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Dashboard, Edit, Menu, Close } from "@mui/icons-material";

const MiniDrawer = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  // State to control the drawer visibility
  const [open, setOpen] = useState(!isMobile); // Open by default on large screens

  // Adjust drawer state based on screen size
  useEffect(() => {
    setOpen(!isMobile); // Close the drawer on mobile, open it on larger screens
  }, [isMobile]);

  // Toggle drawer visibility
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  // Close the drawer on mobile after clicking a menu item
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Define drawer width based on theme and screen size
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer component */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#3f51b5",
            color: "#fff",
            paddingTop: "20px",
            position: isMobile ? "fixed" : "relative",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
      >
        <Box
          sx={{
            padding: "16px",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="white">
            Seller Dashboard
          </Typography>
          {isMobile && (
            <IconButton
              onClick={handleDrawerClose}
              sx={{ color: "white" }}
              aria-label="close drawer"
            >
              <Close />
            </IconButton>
          )}
        </Box>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
        <List>
          {[
            {
              to: "/properties",
              label: "Property Listings",
              icon: <Dashboard />,
            },
            {
              to: "/edit-delete-property",
              label: "Edit/Delete Property",
              icon: <Edit />,
            },
          ].map((item) => (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              onClick={isMobile ? handleDrawerClose : undefined}
              sx={{
                backgroundColor:
                  location.pathname === item.to
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
              }}
            >
              {item.icon && React.cloneElement(item.icon, { sx: { mr: 2 } })}
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0, // Remove padding
          m: 0, // Remove margin
          width: "100%", // Ensure full width
          minHeight: "100vh",
        }}
      >
        {/* Menu Button */}
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 16,
            left: open ? drawerWidth : 16, // Moves with the drawer
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": { backgroundColor: "grey.100" },
            transition: theme.transitions.create("left", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
          aria-label={open ? "close menu" : "open menu"}
        >
          <Menu sx={{ fontSize: "32px", color: "#3f51b5" }} />
        </IconButton>

        {/* Render children (Main Content) */}
        <Box sx={{ mt: 6 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MiniDrawer;
