import React from "react";
import { Typography, Link } from "@material-ui/core";

export function Copyright(props) {
  return (
    <div>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        align="center"
        display="block"
      >
        {"Developed by "}
        <Link color="inherit" href="https://github.com/vkegeles">
          Violetta Kegeles
        </Link>
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        display="block"
      >
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
    </div>
  );
}
