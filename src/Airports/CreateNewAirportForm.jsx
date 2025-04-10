import { TextField, Button, Paper, Typography } from "@mui/material";
import { useState } from 'react';
import { useAppServices } from '../middleware/appServicesContext';
import { useNavigate } from 'react-router-dom';

const CreateNewAirportForm = () => {

  const appService = useAppServices();
  const navigate = useNavigate();
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
          Create New Airport
        </Button>
      </form>
    </Paper>
  );
};

export default CreateNewAirportForm;