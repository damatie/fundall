import React, { useState , useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy, RadioGroupFormsy, } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const AuthorizationFormForDDORE = () => {
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
          <h1>
            Authorization Form For Direct Deposit Of Reimbursable Expenses
          </h1>
        </div>
        <div className={classes.texts}>
          <p>
            I understand SpringRock provides the service of Direct Depositing
            reimbursable expenses. As an employee/consultant l will receive an
            advice detailing the total amount of money deposited to my account
            as reimbursements for SpringRock business expenses incurred by me.
            To designate or change my choice, l need only complete the
            Authorization Agreement below. I may change my election at any time
            by completing a new Authorization Agreement.
          </p>

          <p>
            Please deposit my check directly into the account as indicated
            below. This request supersedes any previous direct deposit requests.
          </p>
          <p>
            (DEPOSITS ARE MADE TO YOUR ACCOUNT WITHIN TWO BUSINESS DAYS AFTER
            THE DATE ON THE REIMBURSEMENT <b>ADVICES SENT TO YOU</b>)
          </p>
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
              <p>Bank Name: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">
            <TextFieldFormsy
              className="mb-16 w-full"
              type="text"
              name="name"
              // label="Employee name"
              validations={{
                minLength: 10,
              }}
              validationErrors={{
                minLength: 'Min character length is 10',
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
              <p>Address: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">
            <TextFieldFormsy
              className="mb-16 w-full"
              type="text"
              name="name"
              // label="Employee name"
              validations={{
                minLength: 4,
              }}
              validationErrors={{
                minLength: 'Min character length is 4',
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
              <p>Account Type: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">

              <RadioGroupFormsy
                className="my-16"
                name="gender"
                // label="Gender"
                // validations="equals:female"
                // validationError="Only ladies are accepted"
                required
              >
                <FormControlLabel value="savings" control={<Radio color="primary"/>} label="Savings"/>
                <FormControlLabel value="current" control={<Radio color="primary"/>} label="Current"/>
              </RadioGroupFormsy>
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
              <p>Account Number: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">
            <TextFieldFormsy
              className="mb-16 w-full"
              type="number"
              name="name"
              // label="Employee name"
              validations={{
                minLength: 4,
              }}
              validationErrors={{
                minLength: 'Min character length is 4',
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
              <p>ABA / SWIFT: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">
            <TextFieldFormsy
              className="mb-16 w-full"
              type="text"
              name="name"
              // label="Employee name"
              validations={{
                minLength: 4,
              }}
              validationErrors={{
                minLength: 'Min character length is 4',
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
              <p>SORT / IBAN: </p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10">
            <TextFieldFormsy
              className="mb-16 w-full"
              type="text"
              name="name"
              // label="Employee name"
              validations={{
                minLength: 4,
              }}
              validationErrors={{
                minLength: 'Min character length is 4',
              }}
              required
            />
            </Grid>
          </Grid>
          <p>
            <b>
              Note: A voided check MUST be attached to this from to ensure
              correct wire transfer and account number information is available
              to Accounts Payable for processing your request. Forms received
              without attachment of a voided check will NOT be processed
            </b>
          </p>
          <p>
            I authorize the Account payable Department of SpringRock to initiate
            credit entries and to initiate, if necessary, debit entries and
            adjustments for any credit made in error under this program to my
            account as designated above and by the attached void check or
            deposit slip.
          </p>
          <p>
            <b>
              The authority to make reimbursement to the account identified
              above may be terminated upon thirty (30) days prior notification
              from me to the company.
            </b>
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
        <p className={classes.texts}>
          It is important that you <u>promptly</u> complete and submit a new
          Direct Deposit Authorization form if you change banks and/or account
          information
        </p>
      </Formsy>
  );
};

export default AuthorizationFormForDDORE;
