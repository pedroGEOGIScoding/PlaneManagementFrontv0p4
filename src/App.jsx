import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Flights from './pages/Flights.jsx';
import MapFlights from './pages/MapFlights.jsx';
import Planes from './pages/Planes.jsx';
import Airports from './pages/Airports.jsx';
import About from './pages/About.jsx';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Flights" element={<Flights />} />
          <Route path="/MapFlights" element={<MapFlights />} />
          <Route path="/Planes" element={<Planes />} />
          <Route path="/Airports" element={<Airports />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Container>   
   </>
  );
}