import React from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TextInput from "../../../../../shared/inputs/textInputs";
import EmployeeFormInput from "../../../../../styles/EmployeeFormInput";
import { boxShadows } from "../../../../../styles/boxShadow";
import Date from "../../../../../shared/dates/date";
import { SignUPButton } from "../../../../../shared/buttons/Button";

const EmployeeHandbookAcknowledgement = () => {
  const classes = EmployeeFormInput();
  const card = boxShadows();

  //  input data
  const employeeName = {
    label: "Employee Name",
    placeholder: "Full Name",
    onChange: "",
  };

  const employeeNumber = {
    label: "Employee Number",
    placeholder: "Employee Number",
    onChange: "",
  };

  return (
    <div className={card.card_boxshadow}>
      <div className={classes.title}>
        <h1>Employee Handbook Acknowledgement</h1>
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
            <TextInput textInputData={employeeName} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "uncontrolled-checkbox" }}
            />
            <p>Sign Document</p>
          </Grid>
          <Grid alignItems="center" container item sm="6" md="6" lg="6" xl="6">
            <Date />
          </Grid>
          <Grid container item sm="12" md="12" lg="12" xl="12">
            <TextInput textInputData={employeeNumber} />
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
              <SignUPButton title="Submit" />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EmployeeHandbookAcknowledgement;
