import axios from "axios";
import { getToken } from "../utils/auth";

const API = "http://localhost:4000/api/workspaces";

export const createWorkspace = async (data) => {
  return axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getWorkspaces = async () => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getWorkspaceTypes = async () => {
  return axios.get(`${API}/types`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
