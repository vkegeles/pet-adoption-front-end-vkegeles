import axios from "axios";
import { baseURL } from "./constansts";

/**
 * axios instance
 */
let instance = axios.create({
  baseURL,
  paramsSerializer: function (params) {
    return JSON.stringify(params);
  },
});

// request header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchClient = instance;
