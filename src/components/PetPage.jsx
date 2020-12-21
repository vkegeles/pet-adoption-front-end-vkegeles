import React from "react";
import { usePetList } from "../context/PetListContext";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { MotionScene, SharedElement, MotionScreen } from "react-motion-layout";
import Gender from "./Gender/Gender";
import { pink } from "@material-ui/core/colors";

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
    height: "80vh",
    // width: 900,
    // height: 900,
  },
  sharedDivContent: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
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
  const pets = usePetList();
  const classes = useStyles();
  const favoriteOnClick = (e) => e.stopPropagation();

  let id = parseInt(props.match.params.id);
  let pet = pets.find((pet) => pet.id === id);
  const composedStyle = { backgroundImage: `url("${pet.picture}")` };
  return (
    <MotionScreen>
      <MotionScene easing="cubic-bezier(0, 0, .58, 1)" name={`pet-${pet.id}`}>
        <Card className={classes.card}>
          <SharedElement.Div
            animationKey="div"
            className={classes.sharedDiv}
            style={composedStyle}
          />
          <SharedElement.Div
            animationKey="cardcontent"
            className={classes.sharedDivContent}
          >
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
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {pet.breed} {pet.type}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Pet status: {pet.adoptionStatus}
                </Typography>
                <Typography variant="subtitle1">Show more...</Typography>
              </CardContent>
            </div>
          </SharedElement.Div>
        </Card>
      </MotionScene>
    </MotionScreen>
  );
}
