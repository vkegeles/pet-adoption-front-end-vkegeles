import React from "react";
import Grid from "@material-ui/core/Grid";
import PetCard from "./PetCard";
import { usePetList } from "../context/PetListContext";

export default function PetList(props) {
  const pets = usePetList();

  return (
    <Grid container spacing={4}>
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </Grid>
  );
}
