import React, { useState } from "react";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import { TextField } from "final-form-material-ui";
import { makeStyles } from "@material-ui/core/styles";
// import { useAuth } from "../../context/AuthContext";
import { Box } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { useAuth } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserForm(props) {
  const [error, setError] = useState("");
  const classes = useStyles();
  const { user } = useAuth();
  const onSubmit = async (values) => {
    props.handleSubmit(values, (err) => {
      setError(err);
    });
    // catch (err) {
    //   setError("Failed to sign up", err);
    // }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.email
      )
    ) {
      errors.email = "Email is incorrect";
    }
    if (!values.password && props.signup) {
      errors.password = "Required";
    }
    if (!values.password_conf && props.signup) {
      errors.password_conf = "Required";
    }
    if (values.password !== values.password_conf) {
      errors.password_conf = "Passwords do not match";
    }
    if (props.signup && values.password && values.password.trim().length < 6) {
      errors.password = "Password needs to be at least six characters";
    }
    if (!values.firstname) {
      errors.firstname = "Required";
    }
    if (!values.lastname) {
      errors.lastname = "Required";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "Required";
    }
    if (!values.firstname) {
      errors.firstname = "Required";
    }
    return errors;
  };

  const getInit = (fullUser) => {
    if (fullUser) {
      const allowedUpdates = [
        "firstname",
        "lastname",
        "email",
        "password",
        "phonenumber",
      ];
      let init = { ...fullUser };
      const params = Object.keys(init);
      params.forEach((param) => {
        if (!allowedUpdates.includes(param)) {
          delete init[param];
        }
      });
      return init;
    } else {
      return {};
    }
  };

  return (
    <>
      {error && (
        <Box component="h2" color="error.main">
          Failed to login: {error}
        </Box>
      )}
      <Form
        onSubmit={onSubmit}
        initialValues={getInit(user)}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_conf"
              label="Password confirmation"
              type="password"
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="First name"
              name="firstname"
              autoComplete="given-name"
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Last name"
              name="lastname"
              autoComplete="family-name"
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Phone number"
              name="phonenumber"
              autoComplete="tel"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting || pristine}
              className={classes.submit}
            >
              {props.btnText}
            </Button>
          </form>
        )}
      />
    </>
  );
}
