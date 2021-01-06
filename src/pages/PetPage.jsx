import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Gender from "../components/Gender/Gender";
import { pink } from "@material-ui/core/colors";
import * as API from "../apis/api";
import PetDetailAttr from "../components/PetComponents/PetDetailAttr";
import PetButtonsComponent from "../components/PetComponents/PetButtonsComponent";
import { useModalContext } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import Like from "../components/Like";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  sharedDiv: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    flex: 1,
    minHeight: "50vh",
    maxHeight: "80vh",
  },
  sharedDivContent: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
    margin: "20px",
  },
  cardname: {
    display: "flex",
    alignItems: "flex-start",
    fontWeight: 700,
    color: pink[500],
  },
});

export default function PetPage(props) {
  const classes = useStyles();
  const [pet, setPet] = useState({ name: "Name", picture: "/paws.png" });
  const [details, setDetails] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { openModal } = useModalContext();
  const { user } = useAuth();

  let id = props.match.params.id;

  useEffect(() => {
    API.getPetByID(id, setPet);
    API.getPetIsFavorite(id, setIsFavorite);
  }, [id]);

  useEffect(() => {
    setDetails([
      { caption: "Breed", value: pet.breed },
      { caption: "Adoption status", value: pet.status },
      { caption: "Height", value: pet.height, add: "sm" },
      { caption: "Weight", value: pet.weight, add: "kg" },
      { caption: "Color", value: pet.color },
      { caption: "Biography", value: pet.bio },
      { caption: "Dietary restrictions", value: pet.dietaryrestrictions },
    ]);
  }, [pet]);

  const handleReturn = () => {
    API.returnPet(pet._id, setPet);
  };
  const handleFoster = () => {
    if (user) {
      API.fosterPet(pet._id, setPet);
    } else openModal();
  };
  const handleAdopt = () => {
    if (user) {
      API.adoptPet(pet._id, setPet);
    } else openModal();
  };

  const favoriteOnClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      setIsFavorite(false);
      API.removePetFromFavorites(id, (res) => {
        console.log("removed from db", res);
      });
    } else {
      setIsFavorite(true);
      API.addPetToFavorites(id, (res) => {
        console.log("added to db", res);
      });
    }
  };

  const composedStyle = pet.picture
    ? {
        backgroundImage: `url("${pet.picture}")`,
      }
    : { backgroundImage: `url(/paws.png)` };
  return (
    <Card className={classes.card}>
      <div className={classes.sharedDiv} style={composedStyle} />
      <div className={classes.sharedDivContent}>
        <div className={classes.cardDetails}>
          <CardContent>
            {user && <Like onClick={favoriteOnClick} isFavorite={isFavorite} />}
            <Typography
              component="h2"
              variant="h5"
              className={classes.cardname}
            >
              {pet.name} <Gender gender={pet.gender} />
            </Typography>
            <Typography variant="h5" paragraph display="block">
              {pet.type}
            </Typography>
            {details &&
              details.map((detail) => (
                <PetDetailAttr key={detail.caption} detail={detail} />
              ))}
            <PetButtonsComponent
              status={pet.status}
              owner={pet.owner}
              onReturn={handleReturn}
              onFoster={handleFoster}
              onAdopt={handleAdopt}
            />
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
