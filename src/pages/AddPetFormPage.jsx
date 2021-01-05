import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import {
  TextField,
  Checkbox,
  Radio,
  Select,
  Input,
} from "final-form-material-ui";

import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CLOUD_NAME } from "../apis/constansts";
import * as API from "../apis/api";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
  },
  paper: { margin: "20px", padding: "25px 16px 16px" },
  margin: { marginTop: "16px" },
}));

export default function AddPetFormPage(props) {
  const [imageUrl, setImageUrl] = useState("");
  const classes = useStyles();

  const onSubmit = (values) => {
    let result = { ...values };
    if (imageUrl) {
      result = { ...values, picture: imageUrl };
    }

    API.addNewPet(result, (res) => {
      window.alert(res);
    });
    // window.alert(JSON.stringify(result, 0, 2));
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.type) {
      errors.type = "Required";
    }
    if (!values.status) {
      errors.status = "Required";
    }
    if (!values.gender) {
      errors.gender = "Required";
    }
    if (values.picture && !imageUrl) {
      errors.picture = "Required upload image before submit";
    }
    return errors;
  };

  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "hjlrywhe");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setImageUrl(res.secure_url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{ gender: "Male", status: "available" }}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper className={classes.paper}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid
                  container
                  item
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                  lg={3}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <Grid item>
                    <Field
                      name="picture"
                      component={Input}
                      type="file"
                      label="Picture of pet"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleImageUpload}
                    >
                      Upload Image
                    </Button>
                  </Grid>
                  <Grid item>
                    <p>The resulting image will be displayed here</p>
                    <Paper variant="outlined">
                      <img
                        src={imageUrl || "/paws.png"}
                        alt="pet"
                        className={classes.image}
                      />
                    </Paper>
                  </Grid>
                </Grid>
                <Grid
                  item
                  lg
                  md
                  sm={12}
                  xs={12}
                  container
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      required
                      name="name"
                      component={TextField}
                      type="text"
                      label="Name"
                    />
                  </Grid>
                  <Grid item lg={3} md={6} sm={12} xs={12}>
                    <Field
                      fullWidth
                      required
                      name="type"
                      component={Select}
                      label="Select a type of animal"
                      formControlProps={{ fullWidth: true }}
                    >
                      <MenuItem value="Cat">Cat</MenuItem>
                      <MenuItem value="Dog">Dog</MenuItem>
                      <MenuItem value="Bird">Bird</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      name="breed"
                      component={TextField}
                      type="text"
                      label="Breed"
                    />
                  </Grid>
                  <Grid item lg={3} md={6} sm={12} xs={12}>
                    <Field
                      fullWidth
                      name="status"
                      required
                      component={Select}
                      label="Status"
                      formControlProps={{ fullWidth: true }}
                    >
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="fostered">Fostered</MenuItem>
                      <MenuItem value="adopted">Adopted</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item lg={3} md={6} sm={12} xs={12}>
                    <FormControl component="fieldset" required>
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup row>
                        <FormControlLabel
                          label="Male"
                          control={
                            <Field
                              name="gender"
                              component={Radio}
                              type="radio"
                              value="Male"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Female"
                          control={
                            <Field
                              name="gender"
                              component={Radio}
                              type="radio"
                              value="Female"
                            />
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item lg={3} md={6} sm={12} xs={12}>
                    <Field
                      fullWidth
                      name="height"
                      component={TextField}
                      type="number"
                      label="Height in sm"
                    />
                  </Grid>
                  <Grid item lg={3} md={6} sm={12} xs={12}>
                    <Field
                      fullWidth
                      name="weight"
                      component={TextField}
                      type="number"
                      label="Weight in kg"
                    />
                  </Grid>

                  <Grid item lg={3} md={6} sm={12} xs={12}>
                    <FormControlLabel
                      label="Hypoallergenic"
                      control={
                        <Field
                          name="hypoallergenic"
                          component={Checkbox}
                          type="checkbox"
                        />
                      }
                    />
                  </Grid>
                  <Grid item lg={3} md={6} sm={12} xs={12}>
                    <Field
                      fullWidth
                      name="color"
                      component={TextField}
                      label="Color"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="bio"
                      component={TextField}
                      multiline
                      label="Biography"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="dietaryrestrictions"
                      component={TextField}
                      multiline
                      label="Dietary restrictions"
                    />
                  </Grid>
                  <Grid item className={classes.margin}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={form.reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item className={classes.margin}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </>
  );
}
