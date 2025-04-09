import React, { useState, useEffect } from 'react'
import planeLanding from '../assets/planeLanding.jpg'
import { Box, Typography } from '@mui/material'


function Home() {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);
  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Box
        component="img"
        src={planeLanding}
        alt="Home"
        sx={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          objectFit: 'fill',
          opacity: 0.5,
          zIndex: 1,
          minWidth: '100vw',
          minHeight: '100vh',
          backgroundSize: 'fill',
          backgroundPosition: 'center'
        }}
      />
        <Box sx={{ 
          position: 'relative',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0
        }}>
          <Typography variant="h2" color="black" fontStyle="italic">
            Flight Management Tool
          </Typography>
          <p></p>
          <Typography variant="h4" color="light blue">
            Track and manage flights in real-time
          </Typography>
          <Typography variant="h6" color="light blue">
            {coordinates ? `Your current position is: ${coordinates.latitude.toFixed(2)}°, ${coordinates.longitude.toFixed(2)}°` : 'Loading coordinates...'}
          </Typography>
        </Box>
    </Box>
  )
}

export default Home;
