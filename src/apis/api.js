import { fetchClient } from "./fetchClient";

export async function getAllPets(cb) {
  fetchClient.get(`/pet`).then((response) => {
    cb(response.data);
  });
}
export async function getPetByID(petID, cb) {
  fetchClient.get(`/pet/` + petID).then((response) => {
    cb(response.data);
  });
}
export async function updatePet(petID, pet, cb) {
  fetchClient.put(`/pet/` + petID, pet).then((response) => {
    cb(response.data);
  });
}
export async function addNewPet(pet, cb) {
  fetchClient.post(`/pet`, pet).then((response) => {
    cb(response.data);
  });
}
export async function fosterPet(petID, cb) {
  fetchClient
    .post(`/pet/${petID}/adopt`, { type: "foster" })
    .then((response) => {
      cb(response.data);
    });
}
export async function adoptPet(petID, cb) {
  fetchClient
    .post(`/pet/${petID}/adopt`, { type: "adopt" })
    .then((response) => {
      cb(response.data);
    });
}

export async function returnPet(petID, cb) {
  fetchClient.post(`/pet/${petID}/return`).then((response) => {
    cb(response.data);
  });
}

export async function getAllUsers(cb) {
  fetchClient.get(`/user`).then((response) => {
    cb(response.data);
  });
}

export async function getUserOwnedPets(userID, cb) {
  fetchClient.get(`/pet/user/${userID}`).then((response) => {
    cb(response.data);
  });
}

export async function getCurrentUserFavoritePets(cb) {
  fetchClient.get(`/user/me/pet/saved`).then((response) => {
    cb(response.data);
  });
}

export async function getPetIsFavorite(petID, cb) {
  fetchClient.get(`/user/me/pet/saved`).then((response) => {
    const pet = response.data.find((item) => item._id === petID);
    cb(typeof pet !== "undefined");
  });
}

export async function addPetToFavorites(petID, cb) {
  fetchClient.post(`/user/me/pet/${petID}/save`).then((response) => {
    cb(response.data);
  });
}

export async function removePetFromFavorites(petID, cb) {
  fetchClient.delete(`/user/me/pet/${petID}/save`).then((response) => {
    cb(response.data);
  });
}
