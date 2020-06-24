import React, { useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';

const AcknowledgementOfHFWPP = () => {
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
          <h1>Acknowledgement Of Harassment Free WorkPlace Policy</h1>
        </div>
        <div className={classes.texts}>
          <p>Dear Employee</p>
          <p>
            You have read through the SpringRock Energy’s policy on
            harassment-free workplace.
          </p>
          <p>Please sign and date below your acknowledgement of this policy.</p>
          <p>
            I have read and fully understand the company’s policy on sexual
            harassment attached hereto. In additions, all questions I may have
            had concerning the policy have been clarified by my supervisor.
          </p>
          <p>
            I understand that l am to report all violations or suspected
            violation of the policy to management immediately, and that I will
            be asked to confirm in writing whether or not any such violations
            have occurred. I also understand that any violation of this policy
            or failure to report violations of the policy will result in
            disciplinary action up to and including dismissal.
          </p>
        </div>
        <div className={classes.formField}>
        <Grid container spacing="2">
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Employee name"
                validations={{
                  minLength: 4,
                }}
                validationErrors={{
                  minLength: 'Min character length is 4',
                }}
                required
              />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Sign Document"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </Grid>
            <Grid alignItems="center" container item sm="6" md="6" lg="6" xl="6">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                required
              />
            </Grid>
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <TextFieldFormsy
                    className="mb-16 w-full"
                    type="number"
                    name="name"
                    label="Employee number"
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
              <div className={classes.submit}>
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
              </div>
            </Grid>
          </Grid>
        </div>
        </Formsy>
  );
};

export default AcknowledgementOfHFWPP;
