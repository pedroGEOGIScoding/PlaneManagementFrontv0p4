import { TextField, Button, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState, useEffect } from 'react';
import { useAppServices } from '../middleware/appServicesContext';
import { useNavigate } from 'react-router-dom';

const CreateNewPlane = () => {
  const appService = useAppServices();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [planes, setPlanes] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    model: '',
    airline: '',
    manufacturer: '',
    capacity: '',
    range: '',
    cruiseSpeed: '',
    isFlying: false
  });

  useEffect(() => {

    async function fetchPlanes() {
      try {
        const data = await appService.plane.getAllPlanes();
        setPlanes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching planes:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchPlanes();
  }, [appService]);
    
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await appService.plane.createPlane(formData);
      alert('Plane created successfully');
      navigate('/planes');
    } catch (error) {
      console.error('Error creating plane:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Create New Plane</Typography>
        {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="model-label">Model</InputLabel>
          <Select
            labelId="model-label"
            name="model"
            value={formData.model}
            onChange={handleChange}
            label="Model"
            disabled={loading}
          >
            {planes.map((plane) => (
              <MenuItem key={plane.id} value={plane.model}>
                {plane.model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          label="Manufacturer"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Range"
          name="range"
          value={formData.range}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Cruise Speed"
          name="cruiseSpeed"
          value={formData.cruiseSpeed}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="flying-label">Flight Status</InputLabel>
          <Select
            labelId="flying-label"
            name="isFlying"
            value={formData.isFlying}
            onChange={handleChange}
            label="Flight Status"
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="outlined" color="primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create New Plane'}
        </Button>
      </form>
    </Paper>
  );
};

export default CreateNewPlane;