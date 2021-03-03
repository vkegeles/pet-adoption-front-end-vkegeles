import axios from "axios";
// export const baseURL = "http://localhost:5000";
export const baseURL = "https://pet-adoption-back-end-vkegeles.herokuapp.com";
export const my_app = axios.create({ baseURL });
export const CLOUD_NAME = "vkegeles";
export const ADMIN_STATUS = 2;
