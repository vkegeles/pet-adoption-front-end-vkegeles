import React from "react";
import { Typography, Link } from "@material-ui/core";

export function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Icons made by "}
      <Link
        color="inherit"
        href="https://www.flaticon.com/authors/freepik"
        title="Freepik"
      >
        Freepik
      </Link>
      {" from "}
      <Link color="inherit" href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </Link>
    </Typography>
  );
}
