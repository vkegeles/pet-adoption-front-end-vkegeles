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
