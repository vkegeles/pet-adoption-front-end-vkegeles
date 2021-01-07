import React from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerMenu from "./DrawerMenu";
import { useAuth } from "./../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";

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
  const { user, logout } = useAuth();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { openModal } = useModalContext();

  const categories = props.categories;
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const onSignOut = () => {
    // TODO window.alert(JSON.stringify(result, 0, 2));
    logout();
    history.push("/");
  };

  const welcomeName =
    "Welcome" + (user ? ", " + user.firstname + " " + user.lastname : "");
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
          {user && (
            <Button color="inherit" onClick={onSignOut}>
              Sign out
            </Button>
          )}
          {!user && (
            <Button color="inherit" onClick={openModal}>
              Login
            </Button>
          )}
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
