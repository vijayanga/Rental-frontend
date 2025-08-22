import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return loading ? (
    <Typography>Loading...</Typography>
  ) : (
    <Card>
      {property.image && (
        <CardMedia
          component="img"
          height="200"
          image={property.image}
          alt="Property Image"
        />
      )}
      <CardContent>
        <Typography variant="h5">{property.location}</Typography>
        <Typography variant="h6">${property.price}</Typography>
        <Typography>Type: {property.propertyType}</Typography>
        <Typography>Status: {property.availability}</Typography>
        <Button
          variant="contained"
          color="primary"
          href={`/edit-property/${id}`}
        >
          Edit Property
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailPage;
