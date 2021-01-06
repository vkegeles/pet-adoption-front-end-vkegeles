import React from "react";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    closeMenuButton: {
      marginRight: "auto",
      marginLeft: 0,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    link: {
      color: "inherit" /* blue colors for links too */,
      textDecoration: "inherit" /* no underline */,
    },
  })
);

function DividerCond(props) {
  if (props.show) return <Divider />;
  else return null;
}

export default function DrawerMenu({
  categories,
  mobileOpen,
  handleDrawerToggle,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const { user } = useAuth();
  const status = user ? user.status : 0;

  const drawer = (
    <div>
      <List>
        {categories.map(
          (category, index) =>
            category.access <= status && (
              <>
                <DividerCond show={category.divider} />
                <Link
                  key={index}
                  to={category.path}
                  onClick={handleDrawerToggle}
                  className={classes.link}
                >
                  <ListItem button key={category.name}>
                    <ListItemText primary={category.name} />
                  </ListItem>
                </Link>
              </>
            )
        )}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Drawer
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          className={classes.closeMenuButton}
        >
          <CloseIcon />
        </IconButton>
        {drawer}
      </Drawer>
      <Hidden xsUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
