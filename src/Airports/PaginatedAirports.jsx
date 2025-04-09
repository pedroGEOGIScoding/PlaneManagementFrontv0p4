import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppServices } from "../middleware/appServicesContext"; // Custom hook

const PaginatedAirports = () => {
  const [airports, setAirports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const appService = useAppServices();

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        setLoading(true);
        const response = await appService.airport.getPaginatedAirports(currentPage);
        setAirports(response.content);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (error) {
        setError("Failed to load airports. Please try again later.");
        setAirports([]);
      } finally {
        setLoading(false);
      }
    };


    fetchAirports();
  }, [currentPage, appService.airport]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    setPage(value);
  };

  const createAirport = () => {
    navigate("/airports/create");
  };

  const detailAirport = (airport) => {
    navigate(`/airports/detail/${airport.id}`, { state: { airport } });
  };

  const updateAirport = (airport) => {
    navigate(`/airports/update/${airport.id}`, { state: { airport } });
  };

  const deleteAirport = async (id) => {
    try {
      await appService.airport.deleteAirport(id);
      setAirports(airports.filter((airport) => airport.id !== id));
      alert('Airport deleted successfully');
      navigate('/airports');
    } catch (error) {
      console.error('Error deleting airport:', error);
      setError('Failed to delete airport');
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" sx={{ flexGrow: 1, marginTop: 5 }}>
            Airports
          </Typography>
          <Button variant="contained" onClick={createAirport}>
            Create Airport
          </Button>
        </Stack>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Elevation</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {airports.map((airport) => (
                  <TableRow key={airport.id}>
                    <TableCell>{airport.airportName}</TableCell>
                    <TableCell>{airport.airportCode}</TableCell>
                    <TableCell>{airport.airportCity}</TableCell>
                    <TableCell>{airport.airportCountry}</TableCell>
                    <TableCell>{airport.airportLatitude}</TableCell>
                    <TableCell>{airport.airportLongitude}</TableCell>
                    <TableCell>{airport.airportElevation}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => updateAirport(airport)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => deleteAirport(airport.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Typography>Page: {page}</Typography>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          variant="outlined"
          showFirstButton
          showLastButton
          shape="rounded"
          size="small"
          sx={{ mt: 2 }}
        />
      </Stack>
    </Paper>
  );
};

export default PaginatedAirports;