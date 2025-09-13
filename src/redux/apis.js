import { message } from "antd";
import axios from "axios";

const apis = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    "Content-Type": "application/json",
  },
});
apis.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
apis.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("accessToken");
      message.error("Session expired. Please log in again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    }
    return Promise.reject(error);
  }
);

export default apis;
