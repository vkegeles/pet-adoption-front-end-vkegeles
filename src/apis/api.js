import axios from "axios";
import { fetchClient } from "./fetchClient";
export async function getAllPets() {
  fetchClient.get(`/pet`).then((response) => {
    return response.data;
  });
}
