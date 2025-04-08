import instanceAxios from "./api";

const planeService = {
  getAllPlanes: async () => {
    try {
      const response = await instanceAxios.get(`/planes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching planes:", error);
      throw error;
    }
  },

  getPaginatedPlanes : async (currentPage) => {
    try {
      const response = await instanceAxios.get(`/planes?page=${currentPage}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching planes", error);
      throw error;
    }
  },

  createPlane: async (plane) => {
    try {
      const response = await instanceAxios.post(`/planes`, plane);
      return response.data;
    } catch (error) {
      console.error("Error creating plane:", error);
      throw error;
    }
  },

  updatePlane: async (id, plane) => {
    try {
      const response = await instanceAxios.put(`/planes/${id}`, plane);
      return response.data;
    } catch (error) {
      console.error("Error updating plane:", error);
      throw error;
    }
  },

  deletePlane: async (id) => {
    try {
      const response = await instanceAxios.delete(`/planes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting plane:", error);
      throw error;
    }
  },
};

export default planeService;
