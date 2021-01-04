import { baseURL } from "./constansts";
import axios from "axios";
import { fetchClient } from "./../apis/fetchClient";

export function login(email, password) {
  // const token = JSON.parse(localStorage.getItem("token"));
  // let config = {
  //   headers: {
  //     authorization: "Bearer " + token,
  //   },
  // };

  return axios
    .post(`${baseURL}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        console.log("token = ", response.data.token);
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
        console.log("token = ", response.data.token);
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
    //     // if no user in localStorage then the user must enter their credentials to proceed
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
    //                 my_app
    //                   .request(config)
    //                   .then((response) => {
    //                     resolve(response);
    //                   })
    //                   .catch((error) => {
    //                     reject(error);
    //                   });
    //               });
  });
};

//       (error) => {
//         if (error.response.status === 401) {
//           // 401 is Unauthorized error
//           // which means that this request failed
//           // what we need to do is send a refresh request then resend the same request
//           // that failed but with the new access point.
//           // We can do this automatically using axios interceptors
//           return refreshToken()
//             .then((response) => {
//               currUser.refresh_token = response.data.refresh_token;
//               currUser.access_token = response.data.access_token;
//               currUser.lastRefresh = new Date().getTime();
//               localStorage.setItem(
//                 "pet_adoption_user",
//                 JSON.stringify(currUser)
//               );

//               // Set default headers to have authorization the access token as authorization for future requests
//               my_app.defaults.headers.common["Authorization"] =
//                 "Bearer " + response.data.access_token;

//               // Get the original that failed due to 401 and resend it
//               // with the new access token
//               const config = error.config;
//               config.headers.Authorization =
//                 "Bearer " + response.data.access_token;

//               // Resending original request
//               return new Promise((resolve, reject) => {
//                 my_app
//                   .request(config)
//                   .then((response) => {
//                     resolve(response);
//                   })
//                   .catch((error) => {
//                     reject(error);
//                   });
//               });
//             })
//             .catch((error) => {
//               // if refresh token failed logout
//               Promise.reject(error);
//               logout();
//             });
//         }
//         logout();
//         return new Promise((resolve, reject) => {
//           reject(error);
//         });
//       }
//     );
//     return my_app.get("/users/current/url").catch((error) => {
//       logout();
//       throw error;
//     });
//   }
// };

// export const login = (email, password) => {
//   console.log(email, password);
//   // let loginFormData = new FormData();
//   // loginFormData.append("grant_type", "password");
//   // loginFormData.append("email", email);
//   // loginFormData.append("password", password);

//   return new Promise((resolve, reject) => {
//     axios
//       .post(`${baseURL}/login`, { email, password })
//       .then(async (response) => {
//         console.log(response.data);
//         response.data.lastRefresh = new Date().getTime();
//         localStorage.setItem(
//           "pet_adoption_user",
//           JSON.stringify(response.data)
//         );
//         getUser()
//           .then((response) => {
//             resolve(response);
//           })
//           .catch((error) => {
//             reject(error);
//           });
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// const refreshToken = () => {
//   let currUser = JSON.parse(localStorage.getItem("pet_adoption_user"));
//   let getUserFormData = new FormData();
//   getUserFormData.append("grant_type", "refresh_token");
//   getUserFormData.append("refresh_token", currUser.refresh_token);
//   return new Promise((resolve, reject) => {
//     my_app
//       .post(`${baseURL}/token/url/`, getUserFormData, {
//         headers: {
//           Authorization: "Basic {secret_key}",
//         },
//       })
//       .then(async (response) => {
//         resolve(response);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
