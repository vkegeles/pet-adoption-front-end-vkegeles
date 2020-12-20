import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Typography,
  CardActionArea,
  Card,
  CardContent,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SharedElement, MotionScene, useMotion } from "react-motion-layout";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { IconButton } from "@material-ui/core";
import Gender from "./Gender/Gender";

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
    width: 250,
  },
  cardname: {
    display: "flex",
    alignItems: "flex-start",
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
  const composedStyle = { backgroundImage: `url("${pet.picture}")` };

  return (
    <Grid item xs={12} md={6}>
      <MotionScene
        easing="cubic-bezier(0, 0, .58, 1)"
        name={`pet-${pet.id}`}
        onClick={withTransition(callback)}
      >
        <Card className={classes.card}>
          <Hidden xsDown>
            <SharedElement.Div
              animationKey="div"
              className={classes.sharedDiv}
              style={composedStyle}
            />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardActionArea component="div">
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
            </CardActionArea>
          </div>
          <IconButton
            color="primary"
            aria-label="favorite"
            component="span"
            className={classes.favorite}
          >
            <FavoriteBorderOutlinedIcon fontSize="large" />
          </IconButton>
        </Card>
      </MotionScene>
    </Grid>
  );
}
