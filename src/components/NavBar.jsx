import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerMenu from "./DrawerMenu";

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

    title: {
      flexGrow: 1,
    },
  })
);

export default function NavBar(props) {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const { currentUser } = useAuth(); //TODO
  // const currentUser = null;
  const currentUser = { name: "Violetta" };
  const categories = props.categories;
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const welcomeName = "Welcome" + (currentUser ? ", " + currentUser.name : "");
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {welcomeName}
          </Typography>
          {currentUser && <Button color="inherit">Sign out</Button>}
          {!currentUser && <Button color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
      <DrawerMenu
        categories={categories}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </>
  );
}
