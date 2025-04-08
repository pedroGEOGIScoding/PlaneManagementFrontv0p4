import instanceAxios from "./api";

const flightService = {
  getAllFlights: async () => {
    try {
      const response = await instanceAxios.get(`/flights`);
      return response.data;
    } catch (error) {
      console.error("Error fetching flights:", error);
      throw error;
    }
  },

  createFlight: async (flight) => {
    try {
      const response = await instanceAxios.post(`/flights`, flight);
      return response.data;
    } catch (error) {
      console.error("Error creating flight:", error);
      throw error;
    }
  },

  updateFlight: async (id, flight) => {
    try {
      const response = await instanceAxios.put(`/flights/${id}`, flight);
      return response.data;
    } catch (error) {
      console.error("Error updating flight:", error);
      throw error;
    }
  },

  deleteFlight: async (id) => {
    try {
      const response = await instanceAxios.delete(`/flights/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting flight:", error);
      throw error;
    }
  },

  getPaginatedFlights : async (currentPage) => {
    try {
      const response = await instanceAxios.get(`/flights?page=${currentPage}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching flights", error);
      throw error;
    }
  },
};

export default flightService;