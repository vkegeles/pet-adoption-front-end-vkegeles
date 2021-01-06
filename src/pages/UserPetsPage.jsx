import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PetList from "../components/PetList";
import * as API from "../apis/api";
import { useAuth } from "../context/AuthContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}
const useStyles = makeStyles({
  main: {
    // backgroundColor: "rgb(214,123,138)",
    // color: "white",
    padding: 20,
  },
});

export default function UserPetsPage(props) {
  const classes = useStyles();
  const { user } = useAuth();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.main}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="My owned pets" {...a11yProps(0)} />
        <Tab label="Favorites pets" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PetList getPetMethod={API.getUserOwnedPets} id={user._id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PetList getPetMethod={API.getCurrentUserFavoritePets} />
      </TabPanel>
    </Paper>
  );
}
