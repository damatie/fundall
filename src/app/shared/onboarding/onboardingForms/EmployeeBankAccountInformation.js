import React from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import TextInput from "../../../../../shared/inputs/textInputs";
import EmployeeFormInput from '../../../../../styles/EmployeeFormInput';
import { boxShadows } from "../../../../../styles/boxShadow";
import Date from '../../../../../shared/dates/date';
import { SignUPButton } from '../../../../../shared/buttons/Button';

const EmployeeBankAccountInformation = () => {
  const classes = EmployeeFormInput();
  const card = boxShadows();

  //  input data
  const name = {
    label: "Full Name",
    placeholder: "Full Name",
    onChange: "",
  };

  const phoneNumber = {
    label: "Phone Number",
    placeholder: "Phone Number",
    onChange: "",
  };

  const position = {
    label: "Position",
    placeholder: "Position",
    onChange: "",
  };

  const email = {
    label: "Email",
    placeholder: "Email",
    onChange: "",
  };

  return (
      <div className={card.card_boxshadow}>
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
              <TextInput textInputData={name} />
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
              <TextInput textInputData={phoneNumber} />
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
              <TextInput textInputData={position} />
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
              <TextInput textInputData={email} />
            </Grid>
            <Grid alignItems="center"  container item sm="12" md="12" lg="12" xl="12">
              <div className={classes.submit}>
              {/* <SignUPButton title='Submit' /> */}
              </div>
            </Grid>
            </Grid>
        </div>
      </div>
  );
};

export default EmployeeBankAccountInformation;
