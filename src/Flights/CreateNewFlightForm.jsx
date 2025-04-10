import { TextField, Button, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState, useEffect } from 'react';
import { useAppServices } from '../middleware/appServicesContext';
import { useNavigate } from 'react-router-dom';

const CreateNewFlightForm = () => {
  const appService = useAppServices();
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    flightNumber: '',
    airline: '',
    flightDuration: '',
    originAirport: '',
    arrivalAirport: '',
    flying: ''
  });

  useEffect(() => {
    async function fetchAirports() {
      try {
        const data = await appService.airport.getAllAirports();
        setAirports(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching airports:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchAirports();
  }, [appService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appService.flight.createFlight(formData);
      alert('Flight created successfully');
      navigate('/flights');
    } catch (error) {
      console.error('Error creating flight:', error);
      alert('Failed to create flight');
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Create New Flight</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Flight Number"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airline"
          name="airline"
          value={formData.airline}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Flight Duration"
          name="flightDuration"
          value={formData.flightDuration}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="origin-airport-label">Origin Airport</InputLabel>
          <Select
            labelId="origin-airport-label"
            name="originAirport"
            value={formData.originAirport}
            onChange={handleChange}
            label="Origin Airport"
            disabled={loading}
          >
            {airports.map((airport) => (
              <MenuItem key={airport.id} value={airport.airportCode}>
                {airport.airportName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="arrival-airport-label">Arrival Airport</InputLabel>
          <Select
            labelId="arrival-airport-label"
            name="arrivalAirport"
            value={formData.arrivalAirport}
            onChange={handleChange}
            label="Arrival Airport"
            disabled={loading}
          >
            {airports.map((airport) => (
              <MenuItem key={airport.id} value={airport.airportCode}>
                {airport.airportName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="flying-label">Flight Status</InputLabel>
          <Select
            labelId="flying-label"
            name="flying"
            value={formData.flying}
            onChange={handleChange}
            label="Flight Status"
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="outlined" color="primary">
          Create New Flight
        </Button>
      </form>
    </Paper>
  );
};

export default CreateNewFlightForm;