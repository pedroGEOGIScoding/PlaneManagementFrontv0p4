import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppServices } from "../middleware/appServicesContext"; // Custom hook to access the BookService


const UpdateAirportForm = () => {

  const appService = useAppServices();
  const location = useLocation();
  const navigate = useNavigate();
  const airport = location.state?.airport || {};

  const [formData, setFormData] = useState({
    airportName: '',
    airportCode: '',
    airportCity: '',
    airportCountry: '',
    airportLatitude: '',
    airportLongitude: '',
    airportElevation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appService.airport.updateAirport(airport.id, formData);
      alert('Airport updated successfully');
      navigate('/airports');
    } catch (error) {
      console.error('Error updating airport:', error);
      alert('Failed to update airport');
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Update Airport</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Airport Name"
          name="airportName"
          value={formData.airportName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Code"
          name="airportCode"
          value={formData.airportCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport City"
          name="airportCity"
          value={formData.airportCity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Country"
          name="airportCountry"
          value={formData.airportCountry}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Latitude"
          name="airportLatitude"
          type="number"
          value={formData.airportLatitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Longitude"
          name="airportLongitude"
          type="number"
          value={formData.airportLongitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Elevation"
          name="airportElevation"
          type="number"
          value={formData.airportElevation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="outlined" color="primary">
          Update Airport
        </Button>
      </form>
    </Paper>
  );
};

export default UpdateAirportForm;