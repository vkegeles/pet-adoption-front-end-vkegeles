import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Gender from "../components/Gender/Gender";
import { pink } from "@material-ui/core/colors";
import { getPetByID } from "../apis/api";

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
  const classes = useStyles();
  const [pet, setPet] = useState({ name: "Name" });
  let id = props.match.params.id;

  useEffect(() => {
    getPetByID(id, setPet);
  }, []);
  const favoriteOnClick = (e) => e.stopPropagation();

  const composedStyle = { backgroundImage: `url("${pet.picture}")` };
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
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {pet.breed} {pet.type}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Pet status: {pet.status}
            </Typography>
            <Typography variant="subtitle1">Show more...</Typography>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
