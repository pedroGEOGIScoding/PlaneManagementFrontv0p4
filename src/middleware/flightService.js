import axios from "axios";

const flightService = {
  getAllFlights: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/flights`
      )
      return response.data;
    } catch (error) {
      console.error("Error fetching flights:", error);
      throw error;
    }
  },

  createFlight: async (flight) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/flights`,
        flight
      );
      return response.data;
    } catch (error) {
      console.error("Error creating flight:", error);
      throw error;
    }
  },

  updateFlight: async (id, flight) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/flights/${id}`,
        flight
      );
      return response.data;
    } catch (error) {
      console.error("Error updating flight:", error);
      throw error;
    }
  },

  deleteFlight: async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/flights/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting flight:", error);
      throw error;
    }
  },
};

export default flightService;