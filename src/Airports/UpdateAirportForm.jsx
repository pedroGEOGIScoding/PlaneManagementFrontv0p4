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
    AirportName: '',
    AirportCode: '',
    AirportCity: '',
    AirportCountry: '',
    AirportLatitude: '',
    AirportLongitude: '',
    AirportElevation: '',
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
          name="AirportName"
          value={formData.AirportName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Code"
          name="AirportCode"
          value={formData.AirportCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport City"
          name="AirportCity"
          value={formData.AirportCity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Country"
          name="AirportCountry"
          value={formData.AirportCountry}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Latitude"
          name="AirportLatitude"
          type="number"
          value={formData.AirportLatitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Longitude"
          name="AirportLongitude"
          type="number"
          value={formData.AirportLongitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airport Elevation"
          name="AirportElevation"
          type="number"
          value={formData.AirportElevation}
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