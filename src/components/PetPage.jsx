import React from "react";
import { usePetList } from "../context/PetListContext";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MotionScene, SharedElement, MotionScreen } from "react-motion-layout";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 300,
  },
  sharedDiv: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: 900,
    height: 900,

    // backgroundImage: `url("${image}")`,
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
      <MotionScene easing="linear" name={`pet-${pet.id}`}>
        <Card className={classes.card}>
          {/* <CardMedia
                className={classes.cardMedia}
                image={pet.picture}
                src="picture"
                title={pet.name}
              > */}
          <SharedElement.Div
            animationKey="div"
            className={classes.sharedDiv}
            style={composedStyle}
          />
          {/* </CardMedia> */}
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                <SharedElement.Text
                  className="font-semibold"
                  animationKey="name"
                >
                  {pet.name}
                </SharedElement.Text>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <SharedElement.Text
                  className="font-semibold"
                  animationKey="type"
                >
                  {pet.type}{" "}
                </SharedElement.Text>
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Gender: {pet.gender}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Pet status: {pet.adoptionStatus}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Show more...
              </Typography>
            </CardContent>
          </div>
        </Card>
      </MotionScene>
    </MotionScreen>
  );
}
