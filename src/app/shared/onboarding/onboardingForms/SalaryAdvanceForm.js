import React from 'react';
import Grid from '@material-ui/core/Grid';
import Date from '../../../../../shared/dates/date';
import TextInput from '../../../../../shared/inputs/textInputs';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import { boxShadows } from '../../../../../styles/boxShadow';
import EuroRoundedIcon from "@material-ui/icons/EuroRounded";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    width: '90%',
    height: '100%',
    margin: '0 auto',
    padding: '0 2rem',
  },
  title: {
    margin: '1rem auto',
    textAlign: 'center',
    width: '80%',
    padding: '2rem 0 1rem 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '1rem 0',
      fontSize: '12px',
    }
  },
  AuthIcon: {
    background: "rgba(28, 119, 195, 0.15)",
    borderRadius: "10px",
    width: "50px",
    height: "40px",
    display: 'inline-block',
    color: "#1C77C3",
    fontSize: "30px",
    textAlign: "center",
    margin: '0 1rem 0 0',
    position: 'relative',
    top: '5px',
  },

}));

const SalaryAdvanceForm = () => {
  //styles
  const classes = useStyles();
  const card = boxShadows();

  //handle name
  const handleName = (e) => {

  };

  //name input data
  const nameInputData = {
    label: 'Name',
    placeholder: 'Name',
    onChange: handleName,
  };

  return (
    <div className={card.card_boxshadow}>
      <div className={classes.container}>
        <header className={classes.title}>
          <h4>
            <span className={classes.AuthIcon}>
              <EuroRoundedIcon />
            </span>
            <strong>SALARY ADVANCE FORM</strong>
          </h4>
        </header>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" alignItems="center">
            <span><strong>Employee Name:</strong></span>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" xl="5" alignItems="center">
            <TextInput textInputData={nameInputData} />
          </Grid>
          <Grid container item sm="1" md="1" lg="1" xl="1" alignItems="center">
            <p><strong>Date:</strong></p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Date />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="1" md="1" lg="1" xl="1" alignItems="center">
            <p>I</p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="5" md="5" lg="5" xl="5" alignItems="center">
            <p>, request for an advance payment of</p>
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="1" md="1" lg="1" xl="1" alignItems="center">
            <p>$/NGN</p>
          </Grid>
          <Grid container item sm="3" md="3" lg="3" xl="3" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="3" md="3" lg="3" xl="3" alignItems="center">
            <Date />
          </Grid>
          <Grid container item sm="5" md="5" lg="5" xl="5" alignItems="center">
            <p>as permitted by SpringRock Group Salary Advance policy.</p>
          </Grid>
        </Grid>

        <p>
          I also agree that if I terminate employment prior to total repayment of this advance, I authorize the company to deduct any unpaid advance amount from the wages/salary owed me at the time of termination of employment.
        </p>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Checkbox /> <span>Employee Sign document</span>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Date />
          </Grid>
        </Grid>

        <p><strong>Approved by:</strong></p>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Checkbox /> <span>Supervisor Sign document</span>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Date />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Checkbox /> <span>Human resources Sign document</span>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Date />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SalaryAdvanceForm;