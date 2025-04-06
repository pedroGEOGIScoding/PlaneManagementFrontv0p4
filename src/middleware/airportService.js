import axios from "./api";

const airportService = {
  getAllAirports: async () => {
    try {
      const response = await axios.get('/airports')
      return response.data;
    } catch (error) {
      console.error("Error fetching airports:", error);
      throw error;
    }
  },
  
  createAirport: async (airport) => {
    try {
      const response = await axios.post('/airports', airport);
      return response.data;
    } catch (error) {
      console.error("Error creating airport:", error);
      throw error;
    }
  },

  updateAirport: async (airportId, airport) => {
    try {
      const response = await axios.put(`/airports/${airportId}`, airport);
      return response.data;
    } catch (error) {
      console.error("Error updating airport:", error);
      throw error;
    }
  },

  deleteAirport: async (airportId) => {
    try {
      const response = await axios.delete(`/airports/${airportId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting airport:", error);
      throw error;
    }
  },
};

export default airportService;
