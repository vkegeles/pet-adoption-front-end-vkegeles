import React from "react";
import Paper from "@material-ui/core/Paper";
import UserForm from "../components/UserForm";
import * as API from "../apis/api";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: { padding: "25px" },
}));

export default function UserSettingsPage() {
  const { user, getUser } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  async function handleSubmit({
    email,
    password,
    firstname,
    lastname,
    phonenumber,
  }) {
    await API.updateUser(
      { email, password, firstname, lastname, phonenumber },
      (res) => {
        console.log(res);
        getUser();
        history.push(`/`);
      }
    );
  }
  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h4" color="primary" align="center">
        Profile settings
      </Typography>
      <UserForm
        handleSubmit={handleSubmit}
        btnText="Change settings"
        signup={false}
      />
    </Paper>
  );
}
