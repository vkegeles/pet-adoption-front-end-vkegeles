import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../context/AuthContext";
import { Box } from "@material-ui/core";
import { useModalContext } from "../../context/ModalContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const { closeModal } = useModalContext();

  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      login(email, password)
        .then((data) => {
          closeModal();
        })
        .catch((error) => {
          setError(error.response.data);
        });
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      {error && (
        <Box component="h2" color="error.main">
          Failed to login: {error}
        </Box>
      )}
      <form className={classes.form} validate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          type="email"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" onClick={props.changeMode}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
