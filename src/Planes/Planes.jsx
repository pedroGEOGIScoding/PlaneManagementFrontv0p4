import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppServices } from "../middleware/appServicesContext";

const Planes = () => {
  const appService = useAppServices();
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
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

  const deletePlane = async (id) => {
    try{
      await appService.plane.deletePlane(id);
      setPlanes(planes.filter((plane) => plane.id !== id));
      alert('Plane deleted successfully');
      navigate('/planes');
    } catch (error) {
      console.error('Error deleting plane:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to delete plane');
      }
    }
  };

  const createNewPlane = () => {
    navigate('/planes/create');
  };

  const detailPlane = (plane) => {
    navigate(`/planes/detail/${plane.id}`, { state: { plane } });
  };

  const updatePlane = (plane) => {
    navigate(`/planes/update/${plane.id}`, { state: { plane } });
  };
  
    return (
      <>
        <h1 style={{ marginTop: '64px' }}>Planes</h1>
        {loading && <p>Loading planes...</p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}

        <Button 
          variant="contained"
          color="primary"
          onClick={createNewPlane}
          sx={{ marginBottom: 2 }}
        >
          Create New Plane
        </Button>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Model</TableCell>
                <TableCell>Airline</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Range</TableCell>
                <TableCell>Cruise Speed</TableCell>
                <TableCell>Flying Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planes.map((plane) => (
                <TableRow key={plane.id}>
                  <TableCell>{plane.model}</TableCell>
                  <TableCell>{plane.airline}</TableCell>
                  <TableCell>{plane.manufacturer}</TableCell>
                  <TableCell>{plane.capacity}</TableCell>
                  <TableCell>{plane.range}</TableCell>
                  <TableCell>{plane.cruiseSpeed}</TableCell>
                  <TableCell>{plane.isFlying ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => detailPlane(plane)}>Detail</Button>
                    <Button variant="contained" onClick={() => updatePlane(plane)}>Update</Button>
                    <Button variant="contained" onClick={() => deletePlane(plane.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  export default Planes;
