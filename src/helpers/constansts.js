import axios from "axios";
export const URL = "http://localhost:5000";
export const API_URL = "http://localhost:5000";
export const my_app = axios.create({ baseURL: API_URL });
