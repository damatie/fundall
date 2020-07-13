import React, { useState , useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';

const BusinessCardRequest = () => {
  const classes = inputStyles();
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  function disableButton()
  {
    setIsFormValid(false);
  }

  function enableButton()
  {
    setIsFormValid(true);
  }

  function handleSubmit(model)
  {
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
        <div className={classes.title}>
          <h1>Business Card Request</h1>
        </div>
        <div className={classes.texts}>
        <Grid container spacing="0.5">
            <Grid
              container
              item
              sm="2"
              md="2"
              lg="2"
              xl="2"
              alignItems="center"
            >
              <p>Name: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
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
            <Grid
              container
              item
              sm="2"
              md="2"
              lg="2"
              xl="2"
              alignItems="center"
            >
              <p>Phone Number: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="number"
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
            <Grid
              container
              item
              sm="2"
              md="2"
              lg="2"
              xl="2"
              alignItems="center"
            >
              <p>Position: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">
            <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
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
            <Grid
              container
              item
              sm="2"
              md="2"
              lg="2"
              xl="2"
              alignItems="center"
            >
              <p>Email: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="email"
                name="name"
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
            <Grid alignItems="center"  container item sm="12" md="12" lg="12" xl="12">
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
            </Grid>
        </div>
      </Formsy>
  );
};

export default BusinessCardRequest;
