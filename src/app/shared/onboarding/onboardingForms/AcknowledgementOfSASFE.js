import React, { useState , useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';

const AcknowledgementOfSASFE = () => {
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
          <h1>Acknowledgement Of Substance Abuse Standard For Employees</h1>
        </div>
        <div className={classes.texts}>
          <h4>INSTRUCTION:</h4>
          <p>
            This form is used for documenting the receipt of the company’s
            substance Abuse Standard for employees and the summary of procedures
            for Testing Employees and Job Applicants, by company employees. A
            separate receipt form should be used for job applicants. The
            original of this form should be retained in the employee’s personal
            file and a copy given to the employee on request.
          </p>
          <h4>EMPLOYEE’S CERTIFICATION:</h4>
          <p>
            I hereby acknowledge that I received a copy of the SpringRock
            Substance Abuse standard for Employees on the date stated below.
          </p>
          <p>
            I acknowledge and agree that I am responsible for reading the
            standard in full and complying with the requirements. I also
            understand that I will be subject to disciplinary action, up to and
            including termination of my employment, as set forth in the
            Standard. I have also been advised and understand that the company
            will answer any questions which I may have regarding the standard
            and that my questions should be addressed to the applicable
            personnel Manager. I also understand and acknowledge that in signing
            this receipt I am giving the company my consent to submit to the
            company’s drug and alcohol tests under the terms and conditions
            described in the standard.
          </p>
          <p>
            I also understand that the company’s substance Abuse standard for
            Employees, is not a contract of employment and does not alter my
            status as an employee at-will, which means that my employment can be
            terminated either by me or the company at any time with or without
            cause and with or without notice. For Unionized Employees: where
            any provision of the standard conflicts with the provisions of a
            collective bargaining agreement between the Company and a union
            representing its employees, the provisions of the collective
            bargaining agreement will supersede. However, failure to comply with
            the standard as so interpreted shall constitute just cause for
            discipline, up to and including discharge.
          </p>
          <p>
            Prior to signing this Receipt, I read it carefully and an
            opportunity to ask questions regarding its content.
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

export default AcknowledgementOfSASFE;
