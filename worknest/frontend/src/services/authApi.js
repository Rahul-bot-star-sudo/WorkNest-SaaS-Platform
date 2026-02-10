import axios from "axios";

export const loginApi = (data) => {
  return axios.post("http://localhost:3000/auth/login", data);
};
