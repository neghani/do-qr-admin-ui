// src/api/apiService.ts
import api from "../api/api";

// Example function to fetch all properties with search parameters
export const fetchAllProperties = async (searchParams = {}) => {
  try {
    const params = new URLSearchParams(searchParams).toString();
    const url = `/property?${params}`;
    console.log("Request URL:", url); // Log the request URL
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createNewProperty = async (data: any) => {
  try {
    const response = await api.post("/property", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const createProperty = async (propertyData: any) => {
  try {
    const response = await api.post("/properties", propertyData);
    return response.data;
  } catch (error) {
    console.error("Failed to create property:", error);
    throw error;
  }
};

export const loginWithAxios = async (credentials: any) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Example function to fetch all units
// export const fetchAllUnits = async () => {
//   try {
//     const response = await api.get("/units");
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch units:", error);
//     throw error;
//   }
// };

// Example function to create a property

// Fetch property by ID
export const fetchPropertyById = async (id: string) => {
  try {
    const response = await api.get(`/property/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch property:", error);
    throw error;
  }
};


// Example function to update a property
export const updateProperty = async (propertyId: string, propertyData: any) => {
  try {
    const response = await api.put(`/property/${propertyId}`, propertyData);
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

