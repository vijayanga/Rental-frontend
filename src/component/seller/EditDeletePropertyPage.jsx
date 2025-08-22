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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const PropertyListingPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editForm, setEditForm] = useState({
    location: "",
    price: "",
    propertyType: "",
    availability: "",
    image: null,
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/properties");
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties", error);
      showSnackbar("Error fetching properties", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleEditClick = (property) => {
    setEditingProperty(property);
    setEditForm({
      location: property.location,
      price: property.price,
      propertyType: property.propertyType,
      availability: property.availability,
      image: null,
    });
  };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/properties/${propertyToDelete._id}`
      );
      setDeleteConfirmOpen(false);
      showSnackbar("Property deleted successfully");
      fetchProperties(); // Refresh the list
    } catch (error) {
      console.error("Error deleting property", error);
      showSnackbar("Error deleting property", "error");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("location", editForm.location);
      formData.append("price", editForm.price);
      formData.append("propertyType", editForm.propertyType);
      formData.append("availability", editForm.availability);

      if (editForm.image) {
        formData.append("image", editForm.image);
      }

      await axios.put(
        `http://localhost:5000/api/properties/${editingProperty._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditingProperty(null);
      showSnackbar("Property updated successfully");
      fetchProperties(); // Refresh the list
    } catch (error) {
      console.error("Error updating property", error);
      showSnackbar("Error updating property", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleImageChange = (e) => {
    setEditForm({ ...editForm, image: e.target.files[0] });
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

      {loading ? (
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
              <Grid item xs={12} sm={6} md={4} lg={3} key={property._id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: 300,
                    height: 350,
                    background: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
                    },
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
                  >
                    <IconButton
                      onClick={() => handleEditClick(property)}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        mr: 1,
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(property)}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        "&:hover": { backgroundColor: "#ffebee" },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>

                  {property.image && (
                    <CardMedia
                      component="img"
                      height="200"
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
                      {property.location}
                    </Typography>
                    <Typography
                      sx={{ color: "#1976d2", fontWeight: 500, fontSize: 18 }}
                    >
                      ${property.price.toLocaleString()}
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

      {/* Edit Property Dialog */}
      <Dialog
        open={!!editingProperty}
        onClose={() => setEditingProperty(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Property</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="location"
              label="Location"
              type="text"
              fullWidth
              variant="outlined"
              value={editForm.location}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              value={editForm.price}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="propertyType"
              label="Property Type"
              select
              fullWidth
              variant="outlined"
              value={editForm.propertyType}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Condo">Condo</MenuItem>
              <MenuItem value="Townhouse">Townhouse</MenuItem>
            </TextField>
            <TextField
              margin="dense"
              name="availability"
              label="Availability"
              select
              fullWidth
              variant="outlined"
              value={editForm.availability}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </TextField>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload New Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {editForm.image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {editForm.image.name}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingProperty(null)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the property at{" "}
            {propertyToDelete?.location}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PropertyListingPage;
