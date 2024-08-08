import api from "../api/api";


// Example function to fetch all units
export const fetchAllUnits = async () => {
    try {
      const response = await api.get("/unit");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch units:", error);
      throw error;
    }
  };

  export const createUnit = async (unitData: any) => {
    try {
      const response = await api.post("/unit", unitData);
      return response.data;
    } catch (error) {
      console.error("Failed to create unit:", error);
      throw error;
    }
  };
  export const fetchUnitById = async (id: string) => {
    try {
      const response = await api.get(`/unit/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch unit:", error);
      throw error;
    }
  };
  // Example function to update a unit
export const updateUnit = async (unitId: string, unitData: any) => {
  try {
    const response = await api.put(`/unit/${unitId}`, unitData);
    return response.data;
  } catch (error) {
    console.error("Failed to update unit:", error);
    throw error;
  }
};