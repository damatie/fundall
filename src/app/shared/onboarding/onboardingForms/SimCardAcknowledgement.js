import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../../../shared/inputs/textInputs';
import CheckBoxes from '../../../../../shared/checkbox/checkbox';
import Date from '../../../../../shared/dates/date';
import SimCardRoundedIcon from '@material-ui/icons/SimCardRounded';
import { makeStyles } from '@material-ui/core/styles';
import { boxShadows } from '../../../../../styles/boxShadow';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    height: '100%',
    margin: '3rem auto 0 auto',
    padding: '0 2rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '5rem auto 0 auto',
    }
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
  para: {
    textAlign: 'center',
    width: '80%',
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

const SimCardAcknowledgement = () => {

  //styles
  const classes = useStyles();
  const card = boxShadows();

  // handle serial number
  const handleSerialNumber = (e) => {

  };

  //serial number input data
  const serialInputData = {
    label: 'Serial number',
    placeholder: 'Serial number',
    onChange: handleSerialNumber,
  };

  //handle color
  const handleColor = (e) => {

  };

  //color input data
  const colorInputData = {
    label: 'Color',
    placeholder: 'Color',
    onChange: handleColor,
  };

  //handle company serial number
  const handleCompanySerialNumber = (e) => {

  };

  //company serial number input data
  const companySerialNumberInputData = {
    label: 'Company serial number',
    placeholder: 'Company serial number',
    onChange: handleCompanySerialNumber,
  };

  //handle sim phone number
  const handleSimPhoneNumber = (e) => {

  };

  //sim phone number input data
  const simPhoneNumberInputData = {
    label: 'Sim phone number',
    placeholder: 'Sim phone number',
    onChange: handleSimPhoneNumber,
  };

  //handle quantity
  const handleQuantity = (e) => {

  };

  //quantity input data
  const quantityInputData = {
    label: 'Quantity',
    placeholder: 'Quantity',
    onChange: handleQuantity,
  };

  //handle name
  const handleName = (e) => {

  };

  //name input data
  const nameInputData = {
    label: 'Name',
    placeholder: 'Name',
    onChange: handleName,
  };

  //handle department
  const handleDepartment = (e) => {

  };

  //department input data
  const departmentInputData = {
    label: 'Department',
    placeholder: 'Department',
    onChange: handleDepartment,
  };

  //handle item
  const handleItem = (e) => {

  };

  //item input data
  const itemInputData = {
    label: 'Item',
    placeholder: 'Item',
    onChange: handleItem,
  };

  return (
    <div className={card.card_boxshadow}>
      <div className={classes.container}>
        <header className={classes.title}>
          <h4 style={{ textAlign: "center" }}>
            <span className={classes.AuthIcon}>
              <SimCardRoundedIcon />
            </span> SPRINGROCK SIM CARD ACKNOWLEDGEMENT FORM
          </h4>

          <p>Please acknowledge the receipt of the following</p>
        </header>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" >
            <p><strong>ITEM:</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <TextInput textInputData={itemInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" >
            <p><strong>PRODUCT SERIAL NUMBER:</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <TextInput textInputData={serialInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" >
            <p><strong>Color</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <TextInput textInputData={colorInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" >
            <p><strong>Company serial number</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <TextInput textInputData={companySerialNumberInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center" >
          <Grid container item sm="4" md="4" lg="4" xl="4" >
            <p><strong>Sim phone number</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <TextInput textInputData={simPhoneNumberInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center" >
          <Grid container item sm="2" md="2" lg="2" xl="2" >
            <p><strong>Quantity</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <TextInput textInputData={quantityInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center" >
          <Grid container item sm="2" md="2" lg="2" xl="2" >
            <p><strong>Name</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <TextInput textInputData={nameInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center" >
          <Grid container item sm="2" md="2" lg="2" xl="2" >
            <p><strong>Department</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <TextInput textInputData={departmentInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignContent="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" alignContent="center">
            <p><strong>Sign</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignContent="center">
            <CheckBoxes />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignContent="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" >
            <p><strong>Date</strong></p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <Date />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SimCardAcknowledgement;