import axios from "axios";
import { getToken } from "../utils/auth";

export const getCompanies = () => {
  return axios.get("http://localhost:4000/api/companies", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};