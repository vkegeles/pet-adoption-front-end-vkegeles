import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import PetList from "../components/PetList";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import * as API from "../apis/api";

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
  const [value, setValue] = useState("");
  let location = useLocation();
  useEffect(() => {
    if (location.search) {
      const query = new URLSearchParams(location.search);
      setValue(query.get("search"));
    }
  }, [location]);

  return (
    <>
      <SearchBar
        className={classes.search}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        // onRequestSearch={() => doSomethingWith(value)}
      />
      <PetList getPetMethod={API.getAllPets} />
    </>
  );
}
