import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/core";
import { amber, blue, pink, yellow } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: amber,
    background: {
      default: "#f7e0e4",
      paper: "#ffffff",
    },
    // text: {
    //   primary: pink[500],
    // }
  },
});

export default function Theme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
