import { fetchClient } from "./fetchClient";
export async function getAllPets(cb) {
  fetchClient.get(`/pet`).then((response) => {
    cb(response.data);
  });
}
export async function getPetByID(id, cb) {
  fetchClient.get(`/pet/` + id).then((response) => {
    cb(response.data);
  });
}
export async function addNewPet(pet, cb) {
  fetchClient.post(`/pet`, pet).then((response) => {
    cb(response.data);
  });
}
export async function fosterPet(id, cb) {
  fetchClient.post(`/pet/${id}/adopt`, { type: "foster" }).then((response) => {
    cb(response.data);
  });
}
export async function adoptPet(id, cb) {
  fetchClient.post(`/pet/${id}/adopt`, { type: "adopt" }).then((response) => {
    cb(response.data);
  });
}

export async function returnPet(id, cb) {
  fetchClient.post(`/pet/${id}/return`).then((response) => {
    cb(response.data);
  });
}

export async function getAllUsers(cb) {
  fetchClient.get(`/user`).then((response) => {
    cb(response.data);
  });
}
