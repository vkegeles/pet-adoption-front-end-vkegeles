import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import UserTable from "./../components/Tables/UserTable";
import PetTable from "./../components/Tables/PetTable";
import * as API from "../apis/api";

const useStyles = makeStyles({
  main: {
    // backgroundColor: "rgb(214,123,138)",
    // color: "white",
    padding: 20,
    marginTop: 20,
  },
});

export default function DashboardPage() {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.main}>
        <Typography component="h1" variant="h4" color="primary" align="center">
          Users
        </Typography>
        <UserTable />
      </Paper>
      <Paper className={classes.main}>
        <Typography component="h1" variant="h4" color="primary" align="center">
          Pets
        </Typography>
        <PetTable getPetMethod={API.getAllPets} />
      </Paper>
    </>
  );
}
