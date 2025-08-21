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
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import PropertyForm from "./PropertyForm";

const PropertyListingPage = () => {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for fetching properties

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/properties"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleAddPropertyClick = () => {
    setShowForm(true);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        px: { xs: 1, sm: 3 },
        py: 4,
        background: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#2d3748",
          mb: 2,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        Property Listings
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPropertyClick}
          sx={{
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 2,
            textTransform: "none",
            fontSize: 18,
          }}
        >
          Add Property
        </Button>
      </Box>

      {showForm ? (
        <PropertyForm />
      ) : loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={3}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#3b4252",
              mb: 2,
              textAlign: "center",
            }}
          >
            Available Properties
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={3} key={property._id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "250",
                    height: 350,
                    background: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.03)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
                    },
                  }}
                >
                  {property.image && (
                    <CardMedia
                      component="img"
                      height="200"
                      width="100%"
                      image={property.image}
                      alt="Property Image"
                      sx={{
                        height: 200,
                        width: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        backgroundColor: "#eee",
                      }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Location: {property.location}
                    </Typography>
                    <Typography sx={{ color: "#1976d2", fontWeight: 500 }}>
                      ${property.price}
                    </Typography>
                    <Typography sx={{ fontSize: 14, mt: 1 }}>
                      Type: {property.propertyType}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      Status: {property.availability}
                    </Typography>
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
