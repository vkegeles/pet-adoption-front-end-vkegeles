import axios from "axios";
import { baseURL } from "./constansts";

/**
 *
 * parse error response
 */
// function parseError(messages) {
//   // error
//   if (messages) {
//     if (messages instanceof Array) {
//       return Promise.reject({ messages: messages });
//     } else {
//       return Promise.reject({ messages: [messages] });
//     }
//   } else {
//     return Promise.reject({ messages: ["エラーが発生しました"] });
//   }
// }

/**
 * parse response
 */
// function parseBody(response) {
//   //  if (response.status === 200 && response.data.status.code === 200) { // - if use custom status code
//   if (response.status === 200) {
//     return response.data.result;
//   } else {
//     return this.parseError(response.data.messages);
//   }
// }

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

// // response parse
// instance.interceptors.response.use(
//   (response) => {
//     return parseBody(response);
//   },
//   (error) => {
//     console.warn("Error status", error.response.status);
//     // return Promise.reject(error)
//     if (error.response) {
//       return parseError(error.response.data);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

// const fetchClient = (method) => {
//   const defaultOptions = {
//     baseURL,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Create instance
//   let instance = axios.create(defaultOptions);

//   // Set the AUTH token for any request
//   instance.interceptors.request.use(function (config) {
//     const token = localStorage.getItem("token");
//     config.headers.Authorization = token ? `Bearer ${token}` : "";
//     return config;
//   });

//   return instance;
// };

// export default fetchClient();
export const fetchClient = instance;
