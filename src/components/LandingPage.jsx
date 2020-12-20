import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  main: {
    position: "relative",
    display: "flex",
    margin: 20,
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 350,
    height: "60vh",
    backgroundColor: "rgb(214,123,138)",
    backgroundImage: "url(/wallpaper.jpg)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    // backgroundBlendMode: "luminosity",
    color: "white",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(240, 163, 175,.3)",
  },
  content: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingTop: 0,
    },
  },
  buttonMainPage: {
    fontSize: "1.5rem",
    borderRadius: "1000px",
    padding: "5px 40px",
  },
  secondPaper: {
    display: "flex",
    margin: "0 20px",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgb(214,123,138)",
    // color: "white",
  },
}));
export default function LandingPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={classes.root}>
      <NavBar />
      <Paper className={classes.main}>
        <div className={classes.overlay} />
        <Grid container>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <div className={classes.content}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Don't be indifferent
              </Typography>
              <Typography component="h2" variant="h5" color="inherit" paragraph>
                Everyone can pass by, but not everyone can stop and help
              </Typography>

              <Typography variant="button" color="inherit">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonMainPage}
                >
                  Take Care
                </Button>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.secondPaper}>
        <SearchBar
          placeholder="Search for furry friend"
          value={searchValue}
          onChange={(newValue) => setSearchValue(newValue)}
          onRequestSearch={() =>
            history.push({
              pathname: "/pets",
              search: `?search=${searchValue}`,
            })
          }
        />
      </Paper>
    </div>
  );
}
