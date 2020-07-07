import React, { useRef, useState, useEffect } from "react";
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
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";

const EmployeeHandbookAcknowledgement = () => {
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
      harassmentFreeWorkplacePolicy: true
    }, {
      headers: {
        Authorization: `JWT ${auth().getToken}`
      }
    });
    request.then(res => {
      // setIndex(2)
      swal.fire({
        title: 'Form submisson',
        text: res.data.message,
        icon: 'success',
        timer: 3000
      });

    }).catch(e => console.error(e));
  }

  // if (userData.loading) {
  //   return (
  //     <div>
  //       Loading....
  //     </div>
  //   );
  // }
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
              <span className={classes.AuthIcon}><MenuBookRoundedIcon /></span>
              Employee Handbook Acknowledgement</h1>
          </div>
          <div className={classes.texts}>
            <p>
              I have read the SPRINGROCK Employee Handbook and have reviewed the
              rules and regulations with the Chief Human Resources Officer and/or
              designee.
        </p>
            <p>
              I understand and agree that my employment is on an at-will basis and
              that no provision contained in this handbook furnished to me creates
              an employment contract. Further, I acknowledge and understand that my
              employer has the right to change or modify such provisions at any time
              and without prior notice.
        </p>
          </div>
          <div className={classes.formField}>
            <Grid container spacing="2">
              <Grid container item sm="12" md="12" lg="12" xl="12">
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="text"
                  name="name"
                  variant="outlined"
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
                  name="name"
                  value={date}
                  required
                  variant="outlined"
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
              <Grid alignItems="center" container item sm="12" md="12" lg="12" xl="12">
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
        </div>
      </div>
    </Formsy>
  );
};

export default EmployeeHandbookAcknowledgement;
