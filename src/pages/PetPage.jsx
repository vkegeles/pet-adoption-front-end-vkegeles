import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Gender from "../components/Gender/Gender";
import { pink } from "@material-ui/core/colors";
import { getPetByID } from "../apis/api";
import PetDetailAttr from "./../components/PetDetailAttr";

const useStyles = makeStyles({
  card: {
    display: "flex",
    margin: "0 20px",
  },
  cardDetails: {
    flex: 1,
  },
  sharedDiv: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left top",
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
  iconfavorite: {
    float: "right",
  },
});

export default function PetPage(props) {
  const classes = useStyles();
  const [pet, setPet] = useState({ name: "Name", picture: "/paws.png" });
  const [details, setDetails] = useState([]);

  let id = props.match.params.id;

  useEffect(() => {
    getPetByID(id, setPet);
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
  const favoriteOnClick = (e) => e.stopPropagation();

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
            <IconButton
              // color="primary"
              aria-label="favorite"
              component="span"
              className={classes.iconfavorite}
              onClick={favoriteOnClick}
            >
              <FavoriteBorderOutlinedIcon fontSize="large" />
            </IconButton>
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
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
