// src/api/apiService.ts
import api from "../api/api";

// Example function to fetch all properties
export const fetchAllProperties = async () => {
  try {
    const response = await api.get("/property");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// Example function to fetch all units
export const fetchAllUnits = async () => {
  try {
    const response = await api.get("/units");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch units:", error);
    throw error;
  }
};

// Example function to create a property
export const createProperty = async (propertyData: any) => {
  try {
    const response = await api.post("/properties", propertyData);
    return response.data;
  } catch (error) {
    console.error("Failed to create property:", error);
    throw error;
  }
};

// Example function to update a property
export const updateProperty = async (propertyId: string, propertyData: any) => {
  try {
    const response = await api.put(`/properties/${propertyId}`, propertyData);
    return response.data;
  } catch (error) {
    console.error("Failed to update property:", error);
    throw error;
  }
};

// Example function to delete a property
export const deleteProperty = async (propertyId: string) => {
  try {
    const response = await api.delete(`/properties/${propertyId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete property:", error);
    throw error;
  }
};
