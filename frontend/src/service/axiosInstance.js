import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:2005/api", // backend kamu
    headers: { "Content-Type": "application/json" },
});

export default axiosInstance;