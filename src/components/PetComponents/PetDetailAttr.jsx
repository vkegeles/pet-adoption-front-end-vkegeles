import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
  },
});

export default function PetDetailAttr({ detail }) {
  const classes = useStyles();

  let show = false;
  if (detail.value && detail.value !== 0) {
    show = true;
  }
  return (
    <Typography variant="subtitle1">
      {show && (
        <>
          <span className={classes.bold}>{detail.caption}</span>: {detail.value}
          {detail.add}
        </>
      )}
    </Typography>
  );
}
