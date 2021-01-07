import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import * as API from "../apis/api";
import PetList from "./../components/PetComponents/PetList";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";

import { Grid, Button, MenuItem } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  search: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: "25px",
    marginBottom: theme.spacing(3),
  },
  advanced: {
    width: "100%",
  },
}));

export default function SearchPage(props) {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const [params, setParams] = useState(null);
  const history = useHistory();

  let location = useLocation();
  useEffect(() => {
    console.log("refresh");
    if (location.search) {
      const search = new URLSearchParams(location.search);
      setParams(search);
      if (search) {
        console.log(search);
        console.log(search.toString());

        setQuery(search.toString());
        setValue(search.get("search"));
      }
    } else {
      setParams(null);
      setQuery("");
      setValue("");
    }
    // }
  }, [location]);

  const onAdvancedSearch = (values) => {
    const result = new URLSearchParams(values);
    if (value) {
      result.append("search", value);
    }
    // result.append("status", "available");
    console.log(result.toString());
    history.push({
      pathname: "/pets",
      search: "?" + result.toString(),
      // state: { detail: "some_value" },
    });
    // setQuery(result.toString());
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item lg md sm xs>
            <SearchBar
              className={classes.search}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              onRequestSearch={() => {
                if (value) {
                  history.push({
                    pathname: "/pets",
                    search: "?search=" + value,
                  });
                }
              }}
            />
          </Grid>
          <Grid item>
            <SearchForm onSubmit={onAdvancedSearch} params={params} />
          </Grid>
        </Grid>
      </Paper>

      <PetList getPetMethod={API.getAllPets} query={query} />
    </>
  );
}

function SearchForm(props) {
  const classes = useStyles();

  return (
    <>
      <Form
        onSubmit={props.onSubmit}
        // initialValues={getInit(props.params)}
        // validate={validate}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid
              item
              container
              alignItems="flex-start"
              spacing={2}
              className={classes.advanced}
            >
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Field
                  fullWidth
                  required
                  name="type"
                  component={Select}
                  label="Select a type of animal"
                  formControlProps={{ fullWidth: true }}
                >
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Bird">Bird</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Field>
              </Grid>

              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Field
                  fullWidth
                  name="status"
                  required
                  component={Select}
                  label="Status"
                  formControlProps={{ fullWidth: true }}
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="fostered">Fostered</MenuItem>
                  <MenuItem value="adopted">Adopted</MenuItem>
                </Field>
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Field
                  fullWidth
                  name="heightfrom"
                  component={TextField}
                  type="number"
                  label="Height min in sm"
                />
                <Field
                  fullWidth
                  name="heightto"
                  component={TextField}
                  type="number"
                  label="Height max in sm"
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Field
                  fullWidth
                  name="weightfrom"
                  component={TextField}
                  type="number"
                  label="Weight min in kg"
                />
                <Field
                  fullWidth
                  name="weightto"
                  component={TextField}
                  type="number"
                  label="Weight max in kg"
                />
              </Grid>

              <Grid item>
                <Button
                  type="button"
                  variant="contained"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || pristine}
                >
                  Advanced Search
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </>
  );
}
