import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/user`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login Function
export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    console.log("Login response ---- ", response);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response.data;
  }
};

// Signup Function
export const signupUser = async ({ username, email, password }) => {
  try {
    const response = await apiClient.post('/register', { username, email, password });
    console.log("Signup response ---- ", response);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error.response.data;
  }
};

export default apiClient;
