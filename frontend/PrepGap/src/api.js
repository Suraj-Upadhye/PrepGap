import axios from "axios";

// Create a configured axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Reads from .env
  withCredentials: true, // Always send cookies (JSESSIONID)
});

export default api;
