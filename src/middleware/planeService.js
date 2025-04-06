import axios from "axios";

const planeService = {
  getAllPlanes: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/planes`
      )
      return response.data;
    } catch (error) {
      console.error("Error fetching planes:", error);
      throw error;
    }
  },

  createPlane: async (plane) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/planes`,
        plane
      );
      return response.data;
    } catch (error) {
      console.error("Error creating plane:", error);
      throw error;
    }
  },

  updatePlane: async (id, plane) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/planes/${id}`,
        plane
      );
      return response.data;
    } catch (error) {
      console.error("Error updating plane:", error);
      throw error;
    }
  },

  deletePlane: async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/planes/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting plane:", error);
      throw error;
    }
  },
};

export default planeService;
