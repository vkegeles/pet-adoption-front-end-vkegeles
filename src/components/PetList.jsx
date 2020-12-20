import React from "react";
import Grid from "@material-ui/core/Grid";
import PetCard from "./PetCard";
import { usePetList } from "../context/PetListContext";
import { MotionScreen } from "react-motion-layout";

export default function PetList(props) {
  const pets = usePetList();

  return (
    <MotionScreen>
      <Grid container spacing={4}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </Grid>
    </MotionScreen>
  );
}
