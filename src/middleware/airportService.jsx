import axios from "axios";

const airportService = {

  getAllAirports : async () => {
    try {
      const response = await axios.get(`${"http://localhost:8080/api/v1"}/airports`);
      return response.data;
    } catch (error) {
      console.error("Error fetching airports", error);
      throw error;
    }
  },

  createAirport : async (airport) => {
    try {
      const response = await axios.post(`${"http://localhost:8080/api/v1"}/airports`, airport);
      return response.data;
    } catch (error) {
      console.error("Error creating airport", error);
      throw error;
    }
  },

  updateAirport : async (id, airport) => {
    try {
      const response = await axios.put(`${"http://localhost:8080/api/v1"}/airports/${id}`, airport);
      return response.data;
    } catch (error) {
      console.error("Error updating airport", error);
      throw error;
    }
  },

  deleteAirport : async (id) => {
    try {
      const response = await axios.delete(`${"http://localhost:8080/api/v1"}/airports/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting airport", error);
      throw error;
    }
  },

  getPaginatedAirports : async (currentPage) => {
    try {
      const response = await axios.get(`${"http://localhost:8080/api/v1"}/airports?page=${currentPage}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching airports", error);
      throw error;
    }
  },
};

export default airportService;
