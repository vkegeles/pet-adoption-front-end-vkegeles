import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PetCard from "./PetCard";
import * as API from "../apis/api";

export default function PetList(props) {
  const [pets, setPets] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const checkPet = (id) => {
    if (favorites.find((item) => item._id === id)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    API.getCurrentUserFavoritePets(setFavorites);
    if (props.id) {
      props.getPetMethod(props.id, setPets);
    } else {
      props.getPetMethod(setPets);
    }
  }, [props]);

  const removePetFromFavorites = (petID) => {
    setFavorites(favorites.filter((item) => item._id !== petID));
    console.log(favorites);
    API.removePetFromFavorites(petID, (res) => {
      console.log("removed from db", res);
    });
  };

  const addPetToFavorites = (petID) => {
    const pet = pets.find((item) => item._id === petID);
    setFavorites([...favorites, ...[pet]]);
    API.addPetToFavorites(petID, (res) => {
      console.log("added to db", res);
    });
  };

  return (
    <Grid container spacing={4}>
      {pets &&
        pets.map((pet) => (
          <PetCard
            key={pet._id}
            pet={pet}
            isFavorite={checkPet(pet._id)}
            removePetFromFavorites={removePetFromFavorites}
            addPetToFavorites={addPetToFavorites}
          />
        ))}
      {(!pets || pets.length === 0) && <p>No pets</p>}
    </Grid>
  );
}
