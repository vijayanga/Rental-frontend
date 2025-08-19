import React from "react";
import { Container, Box, Typography } from "@mui/material";

function Dashboardseller() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Seller Dashboard
        </Typography>
        <Typography variant="body1">
          This is the Seller Dashboard page.
        </Typography>
      </Box>
    </Container>
  );
}

export default Dashboardseller;
