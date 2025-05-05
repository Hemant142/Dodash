import axios from "axios";

const instance = axios.create({
  baseURL: "https://dodash-api.onrender.com/api", // adjust if different
  // baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
