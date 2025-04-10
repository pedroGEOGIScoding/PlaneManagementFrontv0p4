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

const Flights = () => {
  const appService = useAppServices();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchFlights() {
      try {
        const data = await appService.flight.getAllFlights();
        setFlights(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flights:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchFlights();
  }, [appService]);

  const deleteFlight = async (id) => {
    try {
      await appService.flight.deleteFlight(id);
      setFlights(flights.filter((flight) => flight.id !== id));
      alert('Flight deleted successfully');
      navigate('/flights');
    } catch (error) {
      console.error('Error deleting flight:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to delete flight');
      }
    }
  };

  const createNewFlight = () => {
    navigate('/flights/create');
  };

  const detailFlight = (flight) => {
    navigate(`/flights/detail/${flight.id}`, { state: { flight } });
  };

  const updateFlight = (flight) => {
    navigate(`/flights/update/${flight.id}`, { state: { flight } });
  };


  return (
    <>
      <h1 style={{ marginTop: '64px' }}>Flights</h1>
      {loading && <p>Loading flights...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}

      <Button 
        variant="contained"
        color="primary"
        onClick={createNewFlight}
        sx={{ marginBottom: 2 }}
      >
        Create New Flight
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell>Airline</TableCell>
              <TableCell>Flight Duration (hh:mm)</TableCell>
              <TableCell>Origin Airport</TableCell>
              <TableCell>Arrival Airport</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.airline}</TableCell>
                <TableCell>{flight.flightDuration}</TableCell>
                <TableCell>{flight.originAirport}</TableCell>
                <TableCell>{flight.arrivalAirport}</TableCell>
                <TableCell>{flight.flying ? 'Flying' : 'Not Flying'}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => detailFlight(flight)}>Detail</Button>
                  <Button variant="contained" onClick={() => updateFlight(flight)}>Update</Button>
                  <Button variant="contained" onClick={() => deleteFlight(flight.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Flights;