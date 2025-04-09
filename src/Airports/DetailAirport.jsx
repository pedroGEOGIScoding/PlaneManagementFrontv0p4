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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const DetailAirport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [airport, setAirport] = useState(location.state?.airport || {});
  const appService = useAppServices();

  const fetchAirport = async () => {
    if (!airport || !airport.id) return;
    try {
      const response = await appService.airport.getAirportById(airport.id);
      setAirport(response);
    } catch (error) {
      console.error('Error fetching airport:', error);
    }
  };

  useEffect(() => {
    if (airport && airport.id) {
      fetchAirport();
    }
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
      <Box sx={{ display: 'flex', gap: 5, height: '100vh', width: '100vw', marginTop: 10}}> {/* Flex container for side-by-side layout */}
        {/* Card Section */}
        <Card sx={{ width: '50%', mb: 50 }}> {/* Allow card to take up half of the space */}
          <CardContent>
            <Typography variant="h5" sx={{ pt: 1, pb: 1 }}>
              {airport.airportName}
            </Typography>
            <Typography color="text.secondary" sx={{ pt: 1, pb: 1 }}>
              Airport Code: {airport.airportCode}
            </Typography>
            <Typography color="text.secondary" sx={{ pt: 1, pb: 1 }}>
              Airport City: {airport.airportCity}
            </Typography>
            <Typography color="text.secondary" sx={{ pt: 1, pb: 1 }}>
              Airport Country: {airport.airportCountry}
            </Typography>
            <Typography color="text.secondary" sx={{ pt: 1, pb: 1 }}>
              Airport Latitude: {airport.airportLatitude}
            </Typography>
            <Typography color="text.secondary" sx={{ pt: 1, pb: 1 }}>
              Airport Longitude: {airport.airportLongitude}
            </Typography>
            <Typography color="text.secondary" sx={{ pt: 1, pb: 1 }}>
              Airport Elevation: {airport.airportElevation}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={handleBackClick}>
              Back to Airports
            </Button>
          </CardActions>
        </Card>

        {/* Map Section */}
        <Box sx={{ width: '50%', height: '100vh' }}> {/* Allow map to take up half of the space */}
          <MapContainer
            center={[airport.airportLatitude, airport.airportLongitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[airport.airportLatitude, airport.airportLongitude]}>
              <Popup>{airport.airportName}</Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
  );
};

export default DetailAirport;
