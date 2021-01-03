import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";

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
import { CLOUD_NAME } from "../apis/constansts";

const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
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
  return errors;
};

export default function AddPetFormPage(props) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main>
        <section className="left-side">
          <form>
            <div className="form-group">
              <input type="file" />
            </div>

            <button type="button" className="btn" onClick={handleImageUpload}>
              Submit
            </button>
            <button type="button" className="btn widget-btn">
              Upload Via Widget
            </button>
          </form>
        </section>
        <section className="right-side">
          <p>The resulting image will be displayed here</p>
          {imageUrl && (
            <img src={imageUrl} alt={imageAlt} className="displayed-image" />
          )}
        </section>
      </main>

      <Form
        onSubmit={onSubmit}
        initialValues={{ gender: "Male", status: "free" }}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={6}>
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

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="breed"
                    component={TextField}
                    type="text"
                    label="Breed"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="status"
                    required
                    component={Select}
                    label="Status"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="free">Free</MenuItem>
                    <MenuItem value="fostered">Fostered</MenuItem>
                    <MenuItem value="adopted">Adopted</MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="height"
                    component={TextField}
                    type="number"
                    label="Height in sm"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="weight"
                    component={TextField}
                    type="number"
                    label="Weight in kg"
                  />
                </Grid>

                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
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
            </Paper>
          </form>
        )}
      />
    </>
  );
}
