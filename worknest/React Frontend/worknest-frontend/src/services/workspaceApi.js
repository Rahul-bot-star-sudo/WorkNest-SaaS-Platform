import axios from "axios";
import { getToken } from "../utils/auth";

const API = "http://localhost:4000/api/workspaces";

// Common headers
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ✅ Create Workspace
export const createWorkspace = (data) => {
  return axios.post(API, data, authHeader());
};

// ✅ Get All Workspaces
export const getWorkspaces = () => {
  return axios.get(API, authHeader());
};

// ✅ Get Workspace Types
export const getWorkspaceTypes = () => {
  return axios.get(`${API}/types`, authHeader());
};

// ✅ Delete Workspace
export const deleteWorkspace = (id) => {
  return axios.delete(`${API}/${id}`, authHeader());
};

// ✅ Toggle Workspace Status
export const toggleWorkspaceStatus = (id) => {
  return axios.patch(`${API}/${id}/status`, {}, authHeader());
};

export const updateWorkspace = (id, data) => {
  return axios.put(`${API}/${id}`, data, authHeader());
};
