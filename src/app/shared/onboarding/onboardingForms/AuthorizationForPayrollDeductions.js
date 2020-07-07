import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from "app/hooks/useAuth";
import * as Actions from '../store/actions';
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";

const AuthorizationForPayrollDeductions = () => {
  const classes = inputStyles();
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const userData = useSelector(({ employeeProfile }) => employeeProfile.employeeProfile);
  const [agree, setAgree] = useState(false);
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  const auth = useAuth;

  useEffect(() => {
    const request = axios.get(`https://hris-cbit.herokuapp.com/api/v1/onboarding/${auth().getId}`, {
      headers: {
        Authorization: `JWT ${auth().getToken}`
      }
    });
    request.then(res => {
      console.table(res.data);
    }).catch(e => console.error(e));
    if (agree) {
      setDate(new Date().toISOString().substring(0, 10));
    } else {
      setDate('');
    }
  }, [agree]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    const request = axios.patch('https://hris-cbit.herokuapp.com/api/v1/onboarding/sign-form', {
      authorizationForPayrollDeductions: true
    }, {
      headers: {
        Authorization: `JWT ${auth().getToken}`
      }
    });
    request.then(res => {
      swal.fire({
        title: 'Form submisson',
        text: res.data.message,
        icon: 'success',
        timer: 3000
      });

    }).catch(e => console.error(e));
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
          <div className={classes.title}>
            <h1>
              <span className={classes.AuthIcon}><MonetizationOnRoundedIcon /></span>
              Authorization For Payroll Deductions</h1>
          </div>
          <div className={classes.texts}>
            <p>
              I understand that any over payments or payment made to me in error by
              the company are to be paid back to the company as soon as possible.
        </p>

            <p>
              I hereby authorize the company to make deductions from my pay check,
              bonuses, commissions and expense reimbursements for any over payments
              or other money, which I owe to the company.
        </p>
            <p>
              <CheckboxFormsy
                className="my-16"
                name="accept"
                value={false}
                label="Agreed"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </p>
          </div>
          <div className={classes.formField}>
            <Grid container spacing="2">
              <Grid container item sm="12" md="12" lg="12" xl="12">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  variant="outlined"
                  name="name"
                  label="Employee name"
                  value={`${userData.data.firstName} ${userData.data.lastName}`}
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
                  value={agree}
                  label="Sign Document"
                  validations={{
                    equals: true,
                  }}
                  validationErrors={{
                    equals: "You need to accept"
                  }}
                  onChange={e => setAgree(!agree)}
                />
              </Grid>
              <Grid alignItems="center" container item sm="6" md="6" lg="6" xl="6">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="date"
                  variant="outlined"
                  name="name"
                  value={date}
                  required
                />
              </Grid>
              <Grid container item sm="12" md="12" lg="12" xl="12">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  variant="outlined"
                  label="Employee number"
                  value={`${userData.data.employeeNumber ? userData.data.employeeNumber : ''}`}
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
                alignItems="center"
                container
                item
                sm="12"
                md="12"
                lg="12"
                xl="12"
              >
                <div className={classes.submit}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="mx-auto mt-32 mb-10 w-6/12"
                    aria-label="LOG IN"
                    disabled={!isFormValid}
                  >
                    Submit
              </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Formsy>
  );
};

export default AuthorizationForPayrollDeductions;
