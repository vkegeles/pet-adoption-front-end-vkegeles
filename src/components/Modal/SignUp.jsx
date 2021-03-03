import React from "react";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";
import UserForm from "./../UserForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function SignUp(props) {
  const { signup } = useAuth();
  const { closeModal } = useModalContext();

  const classes = useStyles();

  async function handleSubmit(
    { email, password, firstname, lastname, phonenumber },
    cbError
  ) {
    signup(email, password, firstname, lastname, phonenumber)
      .then((data) => {
        closeModal();
      })
      .catch((error) => {
        cbError(error.response.data);
      });
  }

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <UserForm handleSubmit={handleSubmit} btnText="Sign Up" signup={true} />
      <Grid container>
        <Grid item>
          <Link variant="body2" onClick={props.changeMode}>
            {"Already have an account? Log in"}
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
