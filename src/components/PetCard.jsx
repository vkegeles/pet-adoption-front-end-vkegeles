import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Typography,
  CardMedia,
  CardActionArea,
  Card,
  CardContent,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SharedElement, MotionScene, useMotion } from "react-motion-layout";
import { transparent } from "material-ui/styles/colors";

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
    background: transparent,
    width: 300,
  },
});

export default function PetCard({ pet }) {
  const classes = useStyles();
  const history = useHistory();
  const withTransition = useMotion(`pet-${pet.id}`);
  const callback = useCallback(() => history.push(`/pets/${pet.id}`), [
    history,
    pet.id,
  ]);

  return (
    <Grid item xs={12} md={6}>
      <MotionScene
        easing="cubic-bezier(0, 0, .58, 1)"
        name={`pet-${pet.id}`}
        onClick={withTransition(callback)}
      >
        <CardActionArea component="div">
          <Card className={classes.card}>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={pet.picture}
                src="picture"
                title={pet.name}
              >
                <SharedElement.Div
                  animationKey="div"
                  className={classes.sharedDiv}
                />
              </CardMedia>
            </Hidden>
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
        </CardActionArea>
      </MotionScene>
    </Grid>
  );
}
