import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token and log the request
api.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    console.log("Request:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to log the response
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.response?.statusText == "jwt expired") {
      window.location.href = '/login'
    }
    if (!error.response) {
      alert("Server is not responding.")
    }
    
    return Promise.reject(error);
  }
);

export default api;
