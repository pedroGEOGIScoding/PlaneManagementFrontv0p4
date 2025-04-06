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
import axios from "../middleware/api";

const Airports = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Fetch airports
  const fetchAirports = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching airports...');
      const response = await axios.get("/airports");
      console.log('Airports response:', response.data);
      setAirports(response.data);
    } catch (error) {
      console.error("Error fetching airports:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAirport = async (id) => {
    try {
      await axios.delete(`/airports/${id}`);
      setAirports(airports.filter((airport) => airport.id !== id));
      alert("Airport deleted successfully");
      navigate('/airports');
    } catch (error) {
      console.error("Error deleting airport:", error);
      if (error.response && error.response.status === 404) {
        alert("Airport not found");
      }else{
        alert("Error deleting airport");
      }
    }
  };

  const updateAirport = (airport) => {
    navigate(`/airports/update/${airport.id}`, { state: { airport } });
  };
  
  const createNewAirport = () => {
    navigate('/airports/create');
  };
  
  const detailAirport = (airport) => {
    navigate(`/airports/detail/${airport.id}`, { state: { airport } });
  };

  useEffect(() => {
    console.log('Airports useEffect running');
    fetchAirports();
  }, []);
  
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
  
    
  
    
