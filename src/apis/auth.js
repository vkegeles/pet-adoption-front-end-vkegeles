import { baseURL } from "./constansts";
import axios from "axios";
import { fetchClient } from "./../apis/fetchClient";

export function login(email, password) {
  return axios
    .post(`${baseURL}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    });
}

export async function signup(
  email,
  password,
  firstname,
  lastname,
  phonenumber
) {
  return axios
    .post(`${baseURL}/signup`, {
      email,
      password,
      firstname,
      lastname,
      phonenumber,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    });
}

export const logout = () => {
  localStorage.removeItem("token");
  return Promise.resolve();
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.resolve(null);
  }
  return new Promise((resolve, reject) => {
    fetchClient
      .get(`/user/me`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
