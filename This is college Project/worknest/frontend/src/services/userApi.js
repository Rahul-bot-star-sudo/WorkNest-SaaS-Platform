import axios from "axios";
import { getToken } from "../utils/auth";

export const registerUserApi = (data) => {
  return axios.post("http://localhost:3000/users/register", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
