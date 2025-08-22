import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Dashboard, Edit, Delete, Menu } from "@mui/icons-material";

const MiniDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer component */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#3f51b5",
            color: "#fff",
            paddingTop: "20px",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h6" color="white">
            Seller Dashboard
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button component={Link} to="/properties">
            <Dashboard sx={{ mr: 2 }} />
            <ListItemText primary="Property Listings" />
          </ListItem>
          <ListItem button component={Link} to="/edit-delete-property">
            <Edit sx={{ mr: 2 }} />
            <ListItemText primary="Edit/Delete Property" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: "24px" }}>
        <IconButton onClick={toggleDrawer} sx={{ display: "block", mb: 2 }}>
          <Menu sx={{ fontSize: "32px", color: "#3f51b5" }} />
        </IconButton>
        <div>{/* Your page content */}</div>
      </Box>
    </Box>
  );
};

export default MiniDrawer;
