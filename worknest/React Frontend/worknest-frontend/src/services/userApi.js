import axios from "axios";
import { getToken } from "../utils/auth";

const API_BASE_URL = "http://localhost:4000/api";

// 🔹 Axios instance (cleaner)
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 🔹 Attach token automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get Users
export const getUsersApi = async () => {
  const response = await api.get("/users");
  return response.data;
};

// ✅ Create User
export const createUser = async (data) => {
  const response = await api.post("/users", data);
  return response.data;
};
