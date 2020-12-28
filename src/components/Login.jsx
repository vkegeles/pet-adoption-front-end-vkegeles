import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);
      props.closeModal();
    } catch (err) {
      console.log("Failed to log in", err);
    }
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
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
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   Button,
//   TextField,
//   Grid,
//   Paper,
//   Typography,
//   Link,
// } from "@material-ui/core";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// export default function Login(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login, signUp } = useAuth();

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       await login(email, password);
//       props.closeModal();
//     } catch (err) {
//       console.log("Failed to log in", err);
//     }
//   }

//   return (
//     <div>
//       <Grid
//         container
//         direction="column"
//         justify="center"
//         spacing={2}
//         className="login-form"
//       >
//         <Paper variant="elevation" elevation={2} className="login-background">
//           <Grid item>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//           </Grid>
//           <Grid item>
//             <form onSubmit={handleSubmit}>
//               <Grid container direction="column" spacing={2}>
//                 <Grid item>
//                   <TextField
//                     type="email"
//                     placeholder="Email"
//                     fullWidth
//                     name="username"
//                     variant="outlined"
//                     value={email}
//                     onChange={(event) => setEmail(event.target.value)}
//                     required
//                     autoFocus
//                   />
//                 </Grid>
//                 <Grid item>
//                   <TextField
//                     type="password"
//                     placeholder="Password"
//                     fullWidth
//                     name="password"
//                     variant="outlined"
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)}
//                     required
//                   />
//                 </Grid>
//                 <Grid item>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     className="button-block"
//                   >
//                     Submit
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </Grid>
//           <Grid item>
//             <Button variant="body2">Forgot Password?</Button>
//             <Button href="#" variant="body2">
//               Forgot Password?
//             </Button>
//           </Grid>
//         </Paper>
//       </Grid>
//     </div>
//   );
// }
