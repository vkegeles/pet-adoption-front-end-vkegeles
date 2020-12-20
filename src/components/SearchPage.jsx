import React from "react";
import SearchBar from "material-ui-search-bar";
import PetList from "./PetList";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  search: {
    marginBottom: theme.spacing(3),
  },
  main: {
    backgroundColor: "rgb(214,123,138)",
    color: "white",
    padding: 20,
  },
}));

export default function SearchPage(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Paper className={classes.main}>
        <SearchBar
          className={classes.search}
          // value={this.state.value}
          // onChange={(newValue) => this.setState({ value: newValue })}
          // onRequestSearch={() => doSomethingWith(this.state.value)}
        />
        <PetList />
      </Paper>
    </Container>
  );
}
