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
    minHeight: "30vh",
  },
  cardDetails: {
    flex: 1,
    minHeight: "100%",
  },
  cardContent: {
    minHeight: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "space-between",
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
    minHeight: "100%",
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
  const callback = useCallback(() => history.push(`/pets/${pet._id}`), [
    history,
    pet._id,
  ]);
  const favoriteOnClick = (e) => e.stopPropagation();
  const composedStyle = pet.picture
    ? {
        backgroundImage: `url("${pet.picture}")`,
      }
    : { backgroundImage: `url(/paws.png)` };
  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card} onClick={callback}>
        <Hidden xsDown>
          <div className={classes.sharedDiv} style={composedStyle} />
        </Hidden>
        <div className={classes.sharedDivContent}>
          <CardActionArea component="div" className={classes.cardDetails}>
            <CardContent className={classes.cardContent}>
              <Typography
                component="h2"
                variant="h5"
                className={classes.cardname}
                gutterBottom
              >
                {pet.name} <Gender gender={pet.gender} />{" "}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {pet.breed} {pet.type}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Pet status: {pet.status}
              </Typography>
              <Typography variant="button" color="primary" padding={20}>
                Show more...
              </Typography>
            </CardContent>
          </CardActionArea>
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
