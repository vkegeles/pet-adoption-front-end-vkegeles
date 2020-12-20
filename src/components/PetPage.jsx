import React from "react";
import { usePetList } from "../context/PetListContext";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MotionScene, SharedElement, MotionScreen } from "react-motion-layout";
import Gender from "./Gender/Gender";

const useStyles = makeStyles({
  card: {
    display: "flex",
    margin: "0 20px",
  },
  cardDetails: {
    flex: 1,
  },
  sharedDiv: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: 900,
    height: 900,

    cardname: {
      display: "flex",
      alignItems: "flex-start",
    },
  },
});

export default function PetPage(props) {
  const pets = usePetList();
  const classes = useStyles();

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
          <div className={classes.cardDetails}>
            <SharedElement.Div animationKey="cardcontent">
              <CardContent>
                <Typography
                  component="h2"
                  variant="h5"
                  color="primary"
                  style={{ fontWeight: 700 }}
                >
                  Hi
                  {/* <SharedElement.Text
                    animationKey="name"
                    className={classes.cardname}
                  >
                    {pet.name} <Gender gender={pet.gender} />
                  </SharedElement.Text> */}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {/* <SharedElement.Text animationKey="type">
                    {pet.breed} {pet.type}
                  </SharedElement.Text> */}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Pet status: {pet.adoptionStatus}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Show more...
                </Typography>
              </CardContent>
            </SharedElement.Div>
          </div>
        </Card>
      </MotionScene>
    </MotionScreen>
  );
}
