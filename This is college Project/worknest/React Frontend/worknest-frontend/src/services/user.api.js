import axios from "axios";
import { getToken } from "../utils/auth";

const API_BASE_URL = "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 🔐 Attach token automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ✅ Get Users (with role & search filter)
export const getUsersApi = async (role = "", search = "") => {
  const response = await api.get("/users", {
    params: {
      role,
      search,
    },
  });

  return response.data.data;
};


// ✅ Create User
export const createUser = async (data) => {
  const response = await api.post("/users", data);
  return response.data;
};


// ✅ Update User Role
export const updateUserRole = async (id, role) => {
  const response = await api.put(`/users/${id}/role`, {
    role,
  });

  return response.data;
};


// ✅ Toggle User Status
export const toggleUserStatus = async (id) => {
  const response = await api.patch(`/users/${id}/status`);

  return response.data;
};


// ✅ Delete User
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);

  return response.data;
};
