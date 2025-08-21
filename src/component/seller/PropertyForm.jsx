import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Container,
  CircularProgress,
  Paper,
} from "@mui/material";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const PropertyForm = () => {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("location", location);
    formData.append("price", price);
    formData.append("propertyType", propertyType);
    formData.append("availability", availability);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/properties",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Error adding property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 2, color: "#1976d2" }}
          >
            Add Property
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Property Type</InputLabel>
              <Select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                label="Property Type"
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Condo">Condo</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Availability</InputLabel>
              <Select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                label="Availability"
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Not Available">Not Available</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <AddPhotoAlternateIcon sx={{ color: "#1976d2", mr: 1 }} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ marginTop: "4px" }}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                marginTop: 3,
                py: 1.5,
                fontWeight: 700,
                fontSize: 17,
                borderRadius: 2,
                boxShadow: 2,
                background: "linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)",
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Property"}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default PropertyForm;
