import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api", // Set the base URL correctly
});

export default api;
