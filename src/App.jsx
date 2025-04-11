import Navbar from './components/Navbar.jsx';
import AppRoutes from './components/AppRoutes';
import { Container } from '@mui/material';

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <AppRoutes />
      </Container>
    </>
  );
}