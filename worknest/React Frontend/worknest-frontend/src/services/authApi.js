import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true
});

export const loginApi = (data) => {
  return API.post("/auth/login", data);
};
