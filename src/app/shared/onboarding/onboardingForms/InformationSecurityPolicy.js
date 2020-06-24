import React from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TextInput from "../../../../../shared/inputs/textInputs";
import EmployeeFormInput from "../../../../../styles/EmployeeFormInput";
import { boxShadows } from "../../../../../styles/boxShadow";
import Date from "../../../../../shared/dates/date";
import { SignUPButton } from "../../../../../shared/buttons/Button";

const InformationSecurityPolicy = () => {
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
        <h1>Information Security Policy</h1>
      </div>
      <div className={classes.texts}>
        <p>
          I have read and fully understand the SpringRock information Security
          Policy attached herewith.
        </p>
        <p>
          I have asked all questions I have concerning the policy and these have
          been clarified by my manager.
        </p>
        <p>
          I will report all violations or suspected violations of the policy to
          management immediately and that I will be asked to confirm in writing
          whether or not any such violations have occurred.
        </p>
        <p>
          I understand that any violation of this policy or failure to report
          violations of a policy will result in disciplinary action up to and
          including dismissal.
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

export default InformationSecurityPolicy;
