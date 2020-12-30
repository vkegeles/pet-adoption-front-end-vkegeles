import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PetCard from "./PetCard";
import { usePetList } from "../context/PetListContext";
import { getAllPets } from "../apis/api";
import { fetchClient } from "./../apis/fetchClient";

export default function PetList(props) {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetchClient.get(`/pet`).then((response) => {
      setPets(response.data);
    });
    // async function fetchData() {
    //   getAllPets().then((result) => {
    //     console.log(result);
    //     setPets(result);
    //   });
    // }
    // fetchData();
  }, []);

  return (
    <Grid container spacing={4}>
      {pets && pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
      {!pets && <p>No pets</p>}
    </Grid>
  );
}
