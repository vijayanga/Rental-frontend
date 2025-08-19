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
} from "@mui/material";
import axios from "axios";

const PropertyForm = () => {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [image, setImage] = useState(null); // State to store the selected image

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("location", location);
    formData.append("price", price);
    formData.append("propertyType", propertyType);
    formData.append("availability", availability);
    if (image) {
      formData.append("image", image); // Append image if provided
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/properties",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart for image upload
          },
        }
      );
      alert(response.data.message); // Notify user of success
    } catch (error) {
      alert("Error adding property");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography variant="h5">Add Property</Typography>
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

          {/* Image Upload Section */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Set the selected image file
            style={{ marginTop: "16px" }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Add Property
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PropertyForm;
