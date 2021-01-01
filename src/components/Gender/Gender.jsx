import React from "react";
import { ReactComponent as ReactLogoFemale } from "./woman.svg";
import { ReactComponent as ReactLogoMale } from "./man.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  iconFemale: {
    height: 40,
    width: 50,
    paddingLeft: 10,
  },
  iconMale: {
    height: 40,
    width: 50,
    paddingLeft: 15,
  },
});

export default function Gender(props) {
  const classes = useStyles();
  const gender = props.gender ? props.gender.toLowerCase() : "";
  if (gender === "female") {
    return <ReactLogoFemale className={classes.iconFemale} />;
  } else {
    return <ReactLogoMale className={classes.iconMale} />;
  }
}
