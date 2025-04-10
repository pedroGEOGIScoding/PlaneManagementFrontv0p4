import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useAppServices } from "../middleware/appServicesContext";

const DetailFlight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(location.state?.flight || {});
  const appService = useAppServices();

  const fetchFlight = async () => {
    if (!flight || !flight.id) return;
    try {
      const response = await appService.flight.getFlightById(flight.id);
      setFlight(response);
    } catch (error) {
      console.error('Error fetching flight:', error);
    }
  };

  useEffect(() => {
    if (flight && flight.id) {
      fetchFlight();
    }
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: 'flex', gap: 5, height: '100vh', width: '100vw', marginTop: 10}}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Flight Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Flight Number: {flight.flightNumber}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Airline: {flight.airline}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Flight Duration: {flight.flightDuration}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Origin Airport: {flight.originAirport}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Arrival Airport: {flight.arrivalAirport}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Status: {flight.flying ? 'Flying' : 'Not Flying'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleBackClick}>
            Back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default DetailFlight;