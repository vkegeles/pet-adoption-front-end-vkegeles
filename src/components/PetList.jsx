import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PetCard from "./PetCard";
import * as API from "../apis/api";

export default function PetList(props) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    API.getAllPets(setPets);
  }, []);

  return (
    <Grid container spacing={4}>
      {pets && pets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
      {!pets && <p>No pets</p>}
    </Grid>
  );
}
