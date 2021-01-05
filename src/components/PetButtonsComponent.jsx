import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../context/AuthContext";

const useStyles = makeStyles({
  button: {
    margin: "20px 10px 0",
  },
});

export default function PetButtonsComponent({
  status,
  owner,
  onReturn,
  onFoster,
  onAdopt,
}) {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
      spacing={2}
    >
      {/* TODO Check when adopt will work */}
      {user && owner === user._id && (
        <Button
          type="button"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onReturn}
          // disabled={submitting || pristine}
        >
          Return pet to adoption center
        </Button>
      )}
      {status === "available" && (
        <Button
          type="button"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onFoster}
          // disabled={submitting || pristine}
        >
          Foster
        </Button>
      )}
      {status !== "adopted" && (
        <Button
          type="button"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onAdopt}
          // disabled={submitting || pristine}
        >
          Adopt
        </Button>
      )}
    </Grid>
  );
}
