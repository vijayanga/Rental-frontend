import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditDeletePropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState({});
  const [formData, setFormData] = useState({
    location: "",
    price: "",
    propertyType: "",
    availability: "Available",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );
        setProperty(response.data);
        setFormData({
          location: response.data.location,
          price: response.data.price,
          propertyType: response.data.propertyType,
          availability: response.data.availability,
          image: null, // Handle image upload
        });
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const response = await axios.put(
        `http://localhost:5000/api/properties/${id}`,
        data
      );
      alert(response.data.message);
      setUpdated(true);
    } catch (error) {
      console.error("Error updating property", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/properties/${id}`
      );
      alert(response.data.message);
      navigate("/properties"); // Navigate back to properties list
    } catch (error) {
      console.error("Error deleting property", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit and Delete Property
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : updated ? (
        <Typography variant="h6" color="success.main">
          Property Updated Successfully!
        </Typography>
      ) : (
        <>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Property Type</InputLabel>
              <Select
                value={formData.propertyType}
                onChange={(e) =>
                  setFormData({ ...formData, propertyType: e.target.value })
                }
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Condo">Condo</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Availability</InputLabel>
              <Select
                value={formData.availability}
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.value })
                }
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Not Available">Not Available</MenuItem>
              </Select>
            </FormControl>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update Property"}
            </Button>
          </form>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, ml: 2 }}
            onClick={handleDelete}
          >
            Delete Property
          </Button>
        </>
      )}
    </Box>
  );
};

export default EditDeletePropertyPage;
