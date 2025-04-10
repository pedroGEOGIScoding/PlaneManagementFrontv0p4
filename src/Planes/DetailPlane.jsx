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

const DetailPlane = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plane, setPlane] = useState(location.state?.plane || {});
  const appService = useAppServices();

  const fetchPlane = async () => {
    if (!plane || !plane.id) return;
    try {
      const response = await appService.plane.getPlaneById(plane.id);
      setPlane(response);
    } catch (error) {
      console.error('Error fetching plane:', error);
    }
  };

  useEffect(() => {
    if (plane && plane.id) {
      fetchPlane();
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
            Plane Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Model: {plane.model}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Serial Number: {plane.airline}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Manufacturer: {plane.manufacturer}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Capacity: {plane.capacity}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Range: {plane.range}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Cruise Speed: {plane.cruiseSpeed}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Flying Status: {plane.isFlying ? 'Yes' : 'No'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleBackClick}>
            Back to Plane List
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default DetailPlane;