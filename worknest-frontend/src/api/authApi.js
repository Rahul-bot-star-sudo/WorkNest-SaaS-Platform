import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

export const loginApi = (data) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
};