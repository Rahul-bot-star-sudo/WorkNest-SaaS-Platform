import axios from "axios";
import { getToken } from "../utils/auth";

const API = "http://localhost:4000/api/workspaces";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const createWorkspace = (data) => {
  return axios.post(API, data, authHeader());
};

export const getWorkspaces = () => {
  return axios.get(API, authHeader());
};

export const getWorkspaceTypes = () => {
  return axios.get(`${API}/types`, authHeader());
};

export const deleteWorkspace = (id) => {
  return axios.delete(`${API}/${id}`, authHeader());
};

export const toggleWorkspaceStatus = (id) => {
  return axios.patch(`${API}/${id}/status`, {}, authHeader());
};

export const updateWorkspace = (id, data) => {
  return axios.put(`${API}/${id}`, data, authHeader());
};

export const getMyWorkspaces = () => {
  return axios.get(`${API}/my-workspaces`, authHeader());
};
