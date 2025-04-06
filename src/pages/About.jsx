import React from 'react'
import { Box, Typography, Container, Paper } from '@mui/material'
import planeLanding from '../assets/planeLanding.jpg'

function About() {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', pb: 6 }}>
      <Box
        component="img"
        src={planeLanding}
        alt="Plane Landing"
        sx={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.2,
          zIndex: -1
        }}
      />
      <Container disableGutters={true} fixed={false} sx={{ pt: 4, pb: 4, zIndex: 0 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', opacity: 0.5, zIndex: 0 }}>
          <Typography variant="h2" color="primary" fontStyle="italic" gutterBottom align="center">
            About Flight Management
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mt: 4 }}>
            Welcome to our Flight Management System
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 4 }}>
            This comprehensive flight management tool is designed to help aviation professionals and enthusiasts track and manage flights efficiently. Our system provides real-time flight tracking, detailed airport information, and comprehensive aircraft management capabilities.
          </Typography>
          
          <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 4 }}>
            Key Features:
          </Typography>
          
          <Typography component="div" variant="body1">
            <p>
              Welcome to Flight Management Tool, your trusted partner in comprehensive aircraft management solutions. At Flight Management Tool, we understand that owning and operating an aircraft is more than a mode of transportation—its a significant investment that demands meticulous care, strategic planning, and expert oversight. Our mission is to simplify the complexities of aircraft ownership while maximizing efficiency, safety, and value for our clients.
              With a team of seasoned aviation professionals, Flight Management Tool offers a full suite of services tailored to meet the unique needs of private jet owners, corporate fleets, and charter operators. From operational oversight and regulatory compliance to maintenance coordination and financial management, we ensure that every aspect of your aircrafts lifecycle is handled with precision and professionalism. Our commitment to safety is unwavering, adhering to the highest industry standards and leveraging state-of-the-art technology to optimize performance and mitigate risks.
        
            </p>
          </Typography>
          
          <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 4 }}>
            Core Services:
          </Typography>
          
          <Typography component="div" variant="body1">
            <ul>
            <li>Real-time flight tracking and monitoring</li>
              <li>Comprehensive airport database management</li>
              <li>Aircraft fleet administration</li>
              <li>Interactive maps and visualizations</li>
              <li>Detailed flight statistics and reporting</li>
            </ul>
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default About;