import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

export const registerSuperAdmin = (data) => {
    return API.post("/super-admin/register", data);
}