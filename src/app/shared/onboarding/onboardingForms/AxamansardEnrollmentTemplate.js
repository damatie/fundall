import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Formsy from 'formsy-react';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';
import MenuItem from '@material-ui/core/MenuItem';
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";

const AxaMansardEnrollmentTemplate = () => {
  const classes = inputStyles();
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    console.info('submit', model);
  }

  return (
    <Formsy
      onValidSubmit={handleSubmit}
      onValid={enableButton}
      onInvalid={disableButton}
      ref={formRef}
      className="flex flex-col justify-center"
    >
      <div className={classes.formField}>
        <div className={classes.container}>
          <header className={classes.title}>
            <h1>
              <span className={classes.AuthIcon}>
                <LocalHospitalRoundedIcon />
              </span>
              Axa Mansard Enrollment Template
          </h1>
          </header>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
              <p><strong>SURNAME</strong></p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" lx="11" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="Surname"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
              <p><strong>FIRST NAME</strong></p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" lx="11" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="First name"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
              <p><strong>MIDDLE NAME</strong></p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" lx="11" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="Middle name"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
              <p><strong>PLAN</strong></p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" lx="11" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="Plan"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
              <p><strong>STATUS</strong></p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" lx="11" alignItems="center">
              {/* <TextInput textInputData={''} /> */}
              <SelectFormsy
                className="my-16 w-full"
                name="related"
                // label="Related with"
                placeholder="Status"
                value="none"
              // validations="equals:none"
              // validationError="Must be None"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="mr">Mr</MenuItem>
                <MenuItem value="mrs">Mrs</MenuItem>
                <MenuItem value="miss">miss</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
              <p><strong>SEX</strong></p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" lx="11" alignItems="center">
              {/* <TextInput textInputData={''} /> */}
              <SelectFormsy
                className="my-16 w-full"
                name="related"
                // label="Related with"
                value="none"
                placeholder="Sex"
              // validations="equals:none"
              // validationError="Must be None"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
              <p><strong>DATE OF BIRTH</strong></p>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
              <p><strong>PHONE NUMBER</strong></p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="Phone number"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
              <p><strong>PRE-EXISTING CONDITION</strong></p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="Pre-existing condition"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
              <p><strong>PRIMARY HOSPITAL</strong></p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="Primary Hospital"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
              <p><strong>SECONDARY HOSPITAL</strong></p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="Secondary hospital"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
              <p><strong>E-MAIL (STAFF ONLY)</strong></p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="email"
                name="name"
                variant="outlined"
                placeholder="E-Mail"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
              <p><strong>ADDRESS</strong></p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder="Address"
                variant="outlined"
                // label="Employee number"
                validations={{
                  minLength: 1,
                }}
                validationErrors={{
                  minLength: 'Min character length is 1',
                }}
                required
              />
            </Grid>
          </Grid>

          <Grid
            alignItems="center"
            container
            item
            sm="12"
            md="12"
            lg="12"
            xl="12"
          >
            {/* <div className={classes.submit}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mx-auto mt-32 mb-80 w-6/12"
                aria-label="LOG IN"
                disabled={!isFormValid}
              >
                Submit
              </Button>
            </div> */}
          </Grid>
        </div>
      </div>
    </Formsy>
  );
};

export default AxaMansardEnrollmentTemplate;