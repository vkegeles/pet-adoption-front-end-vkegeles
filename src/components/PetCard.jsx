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
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { IconButton } from "@material-ui/core";
import Gender from "./Gender/Gender";
import { pink } from "@material-ui/core/colors";

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
});

export default function PetCard({ pet }) {
  const classes = useStyles();
  const history = useHistory();
  const callback = useCallback(() => history.push(`/pets/${pet.id}`), [
    history,
    pet.id,
  ]);
  const favoriteOnClick = (e) => e.stopPropagation();
  const composedStyle = { backgroundImage: `url("${pet.picture}")` };

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card} onClick={callback}>
        <Hidden xsDown>
          <div className={classes.sharedDiv} style={composedStyle} />
        </Hidden>
        <div className={classes.sharedDivContent}>
          <div className={classes.cardDetails}>
            <CardActionArea component="div">
              <CardContent>
                <Typography
                  component="h2"
                  variant="h5"
                  className={classes.cardname}
                >
                  {pet.name} <Gender gender={pet.gender} />{" "}
                </Typography>
                <Typography
                  variant="subtitle1"
                  // color="textSecondary"
                  gutterBottom
                >
                  {pet.breed} {pet.type}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Pet status: {pet.status}
                </Typography>
                <Typography variant="subtitle1">Show more...</Typography>
              </CardContent>
            </CardActionArea>
          </div>
          <IconButton
            aria-label="favorite"
            component="span"
            onClick={favoriteOnClick}
          >
            <FavoriteBorderOutlinedIcon fontSize="large" />
          </IconButton>
        </div>
      </Card>
    </Grid>
  );
}
