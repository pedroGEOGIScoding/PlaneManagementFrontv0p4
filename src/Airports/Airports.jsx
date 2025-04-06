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
import { useAppService } from "../middleware/appServicesContext";

const Airports = () => {
  const appService = useAppService();
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
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

  const createNewAirport = () => {
    navigate('/airports/create');
  };

  const detailAirport = (airport) => {
    navigate(`/airports/detail/${airport.id}`);
  };

  const updateAirport = (airport) => {
    navigate(`/airports/update/${airport.id}`);
  };

  const deleteAirport = async (id) => {
    try{
      await appService.airport.deleteAirport(id);
      setAirports(airports.filter((airport) => airport.id !== id));
      alert('Airport deleted successfully');
      navigate('/airports');
    } catch (error) {
      console.error('Error deleting airport:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to delete airport');
      }
    }
  };
  
    return (
      <>
        <h1>Airports</h1>
        {loading && <p>Loading airports...</p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}

        <Button 
          variant="contained"
          color="primary"
          onClick={createNewAirport}
          sx={{ marginBottom: 2 }}
        >
          Create New Airport
        </Button>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Elevation</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {airports.map((airport) => (
                <TableRow key={airport.id}>
                  <TableCell>{airport.airportName}</TableCell>
                  <TableCell>{airport.airportCity}</TableCell>
                  <TableCell>{airport.airportCountry}</TableCell>
                  <TableCell>{airport.airportElevation}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => detailAirport(airport)}>Detail</Button>
                    <Button variant="contained" onClick={() => updateAirport(airport)}>Update</Button>
                    <Button variant="contained" onClick={() => deleteAirport(airport.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
  
  export default Airports;
  
    
  
    
