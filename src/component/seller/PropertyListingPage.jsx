import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import PropertyListingForm from "./PropertyForm"; // Import the property form component

const PropertyListingPage = () => {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch properties when component mounts
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/properties"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };

    fetchProperties();
  }, [properties]);

  const handleAddPropertyClick = () => {
    setShowForm(true); // Show the property form when Add Property button is clicked
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Property Listings
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddPropertyClick}
      >
        Add Property
      </Button>

      {showForm ? (
        <PropertyListingForm /> // Show Property form to add new property
      ) : (
        <Box mt={3}>
          <Typography variant="h5">Available Properties</Typography>
          <Grid container spacing={3}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {property.image && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={property.image} // Display the property image
                      alt="Property Image"
                      sx={{ objectFit: "cover" }} // Ensures the image covers the area without stretching
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      Location: {property.location}
                    </Typography>
                    <Typography>Price: ${property.price}</Typography>
                    <Typography>Type: {property.propertyType}</Typography>
                    <Typography>Status: {property.availability}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default PropertyListingPage;
