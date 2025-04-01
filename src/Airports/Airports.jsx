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
import { useNavigate, Link } from "react-router-dom";
import axios from "../middleware/api";
import CreateNewAirportForm from "./CreateNewAirportForm.jsx";
import DetailAirport from "./DetailAirport.jsx";
import UpdateAirportForm from "./UpdateAirportForm.jsx";

const Airports = () => {
  const [airports, setAirports] = useState([]);
  const navigate = useNavigate();
  
  // Fetch airports
  const fetchAirports = async () => {
    try {
      const response = await axios.get("/airports");
      setAirports(response.data);
    } catch (error) {
      console.error("Error fetching airports:", error);
    }
  };

  const deleteAirport = async (id) => {
    try {
      await axios.delete(`/airports/${id}`);
      setAirports(airports.filter((airport) => airport.id !== id));
      alert("Airport deleted successfully");
      navigate('/Airports');
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
    navigate(`/updateAirport/${airport.id}`, { state: { airport } });
  };
  
  const createNewAirport = () => {
    navigate('/createNewAirport');
  };
  
  const detailAirport = (airport) => {
    navigate(`/detailAirport/${airport.id}`, { state: { airport } });
  };

  useEffect(() => {
    fetchAirports();
  }, []);
  
    return (
      <Container>
        <h1>Airports</h1>

        <Button 
          variant="contained"
          color="primary"
          onClick={createNewAirport}
          sx={{ marginBottom: 16 }}
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
      </Container>
    );
  };
  
  
    
  
    
