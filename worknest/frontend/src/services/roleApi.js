import axios from "axios";
import { getToken } from "../utils/auth";

export const getDropdownRoles = () => {
  return axios.get("http://localhost:3000/roles/dropdown", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
