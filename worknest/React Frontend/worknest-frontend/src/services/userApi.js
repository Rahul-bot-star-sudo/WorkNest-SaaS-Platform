import axios from "axios";
import { getToken } from "../utils/auth";

export const getUsersApi = () => {
  return axios.get("http://localhost:4000/users", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
