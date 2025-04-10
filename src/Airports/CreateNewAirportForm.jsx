import { TextField, Button, Paper, Typography } from "@mui/material";
import { useState } from 'react';
import { useAppServices } from '../middleware/appServicesContext';
import { useNavigate } from 'react-router-dom';

const CreateNewAirportForm = () => {

  const appService = useAppServices();
  const navigate = useNavigate();
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
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appService.airport.createAirport(formData);
      alert('Airport created successfully');
      navigate('/airports');
    } catch (error) {
      console.error('Error creating airport:', error);
      alert('Failed to create airport');
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Create New Airport</Typography>
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
          Create New Airport
        </Button>
      </form>
    </Paper>
  );
};

export default CreateNewAirportForm;