import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Flights from './Flights/Flights.jsx';
import CreateNewFlightForm from './Flights/CreateNewFlightForm.jsx';
import DetailFlight from './Flights/DetailFlight.jsx';
import UpdateFlightForm from './Flights/UpdateFlightForm.jsx';
import MapFlights from './pages/MapFlights.jsx';
import Planes from './Planes/Planes.jsx';
import CreateNewPlane from './Planes/CreateNewPlane.jsx';
import DetailPlane from './Planes/DetailPlane.jsx';
import UpdatePlaneForm from './Planes/UpdatePlaneForm.jsx';
import Airports from './Airports/Airports.jsx';
import CreateNewAirportForm from './Airports/CreateNewAirportForm.jsx';
import UpdateAirportForm from './Airports/UpdateAirportForm.jsx';
import DetailAirport from './Airports/DetailAirport.jsx';
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
          <Route path="/flights" element={<Flights />} />
          <Route path="/mapFlights" element={<MapFlights />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/airports" element={<Airports />} />
          <Route path="/about" element={<About />} />
          <Route path="/planes/create" element={<CreateNewPlane />} />
          <Route path="/planes/detail/:id" element={<DetailPlane />} />
          <Route path="/planes/update/:id" element={<UpdatePlaneForm />} />
          <Route path="/airports/create" element={<CreateNewAirportForm />} />
          <Route path="/airports/detail/:id" element={<DetailAirport />} />
          <Route path="/airports/update/:id" element={<UpdateAirportForm />} />
          <Route path="/flights/create" element={<CreateNewFlightForm />} />
          <Route path="/flights/detail/:id" element={<DetailFlight />} />
          <Route path="/flights/update/:id" element={<UpdateFlightForm />} />
        </Routes>
      </Container>
    </>
  );
}