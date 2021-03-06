import React, { useState, useEffect } from "react";
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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
  },
  paper: { padding: "25px" },
  margin: { marginTop: "16px" },
}));

export default function AddPetFormPage(props) {
  const [imageUrl, setImageUrl] = useState("");
  const [pet, setPet] = useState({ gender: "Male", status: "available" });
  const history = useHistory();
  let petID = props.match.params.id;

  const classes = useStyles();
  useEffect(() => {
    if (petID) {
      API.getPetByID(petID, setPet);
    }
  }, [petID]);

  useEffect(() => {
    if (pet.picture) {
      setImageUrl(pet.picture);
    }
  }, [pet]);

  const getInit = (fullPet) => {
    const allowedUpdates = [
      "name",
      "type",
      "breed",
      "gender",
      "status",
      "height",
      "weight",
      "color",
      "bio",
      "dietaryrestrictions",
      "hypoallergenic",
    ];
    let init = { ...fullPet };
    const params = Object.keys(init);
    params.forEach((param) => {
      if (!allowedUpdates.includes(param)) {
        delete init[param];
      }
    });
    return init;
  };

  const ImageUpload = (cb) => {
    //ref is unsupported by libraries, waiting for fix
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "hjlrywhe");
    const options = {
      method: "POST",
      body: formData,
    };

    return fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setImageUrl(res.secure_url);
        cb(res.secure_url);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (values) => {
    const fetch = (image) => {
      let result = { ...values };
      if (image) {
        result = { ...values, picture: image };
      }
      delete result["localimage"];
      if (petID) {
        API.updatePet(petID, result, (res) => {
          history.push(`/pets/${res._id}`);
        });
      } else {
        API.addNewPet(result, (res) => {
          history.push(`/pets/${res._id}`);
        });
      }
    };

    if (values.localimage) ImageUpload((image) => fetch(image));
    else fetch();
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
    if (values.height && values.height < 0) {
      errors.height = "Required positive number";
    }
    if (values.weight && values.weight < 0) {
      errors.weight = "Required positive number";
    }
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={getInit(pet)}
      validate={validate}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
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
                lg={6}
                md={6}
                sm={12}
                xs={12}
              >
                <Grid item>
                  <Field
                    name="localimage"
                    component={Input}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    label="Picture of pet"
                  />
                </Grid>
                <Grid item>
                  <p>The resulting image will be displayed here</p>
                  <Paper variant="outlined">
                    <Picture local={values.localimage} url={imageUrl} />
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Field
                    fullWidth
                    name="height"
                    component={TextField}
                    type="number"
                    label="Height in sm"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Field
                    fullWidth
                    name="weight"
                    component={TextField}
                    type="number"
                    label="Weight in kg"
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                    disabled={submitting || pristine}
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
  );
}

function Picture(props) {
  const classes = useStyles();
  let src = "";
  if (props.local) {
    const { files } = document.querySelector('input[type="file"]');
    src = URL.createObjectURL(files[0]);
  } else if (props.url) {
    src = props.url;
  } else {
    src = "/paws.png";
  }

  return <img src={src} alt="pet" className={classes.image} />;
}
