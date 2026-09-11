import axios from "axios";
import { getToken } from "../utils/auth";

export const getDropdownRoles = () => {
  return axios.get("http://localhost:4000/api/roles/creatable", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
