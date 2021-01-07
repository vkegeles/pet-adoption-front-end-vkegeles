import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
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
export default function HomePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
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
                Welcome back!
              </Typography>
              <Typography component="h2" variant="h5" color="inherit" paragraph>
                Search to find new best friend
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.secondPaper}>
        <SearchBar
          placeholder="Search for new friend"
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
