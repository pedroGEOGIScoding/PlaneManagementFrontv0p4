import instanceAxios from "./api.js";

const airportService = {

  getAllAirports : async () => {
    try {
      const response = await instanceAxios.get(`/airports`);
      return response.data;
    } catch (error) {
      console.error("Error fetching airports", error);
      throw error;
    }
  },

  getAirportById : async (id) => {
    try {
      const response = await instanceAxios.get(`/airports/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching airport by id", error);
      throw error;
    }
  },

  createAirport : async (airport) => {
    try {
      console.log('Creating airport with data:', airport);
      const response = await instanceAxios.post(`/airports`, airport);
      console.log('Airport created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating airport", error);
      throw error;
    }
  },

  updateAirport : async (id, airport) => {
    try {
      const response = await instanceAxios.put(`/airports/${id}`, airport);
      return response.data;
    } catch (error) {
      console.error("Error updating airport", error);
      throw error;
    }
  },

  deleteAirport : async (id) => {
    try {
      const response = await instanceAxios.delete(`/airports/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting airport", error);
      throw error;
    }
  },

  getPaginatedAirports : async (currentPage) => {  
    try {
      const response = await instanceAxios.get(`/airports/page/${currentPage}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching airports", error);
      throw error;
    }
  },
};

export default airportService;
