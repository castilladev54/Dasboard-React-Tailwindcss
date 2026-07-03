import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://backend-inventory-system.vercel.app/api",
  withCredentials: true // Trae la cookie HttpOnly automáticamente
});

export default API;
