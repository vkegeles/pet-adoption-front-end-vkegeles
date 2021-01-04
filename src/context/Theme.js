import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { amber, pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: amber,
    background: {
      default: "#f7e0e4",
      paper: "#ffffff",
    },
  },
});

export default function Theme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
