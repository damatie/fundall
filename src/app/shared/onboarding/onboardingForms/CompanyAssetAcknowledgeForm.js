import React, { useRef, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';
import { makeStyles } from "@material-ui/core/styles";
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';

const useStyles = makeStyles((theme) => ({
  section: {
    textAlign: 'center',
    margin: '0 0 1rem 0'
  }
}));

const CompanyAssetAcknowledgeForm = () => {

  const style = useStyles();
  const classes = inputStyles();

  return (
    <Formsy>
      <div className={classes.formField}>
        <div className={classes.container}>
          <div className={classes.title}>
            <h1>
              <span className={classes.AuthIcon}><BorderColorRoundedIcon /></span>
              COMPANY ASSET ACKNOWLEDGEMENT FORM</h1>
          </div>

          <p>Please acknowledge the receipt of the following</p>

          <div className={style.section}>
            <h4><b>LAPTOP ACKNOWLEDGEMENT</b></h4>
          </div>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
              <p>Item</p>
            </Grid>
            <Grid item xs="11" sm="11" md="11" lg="11" xl="11">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                variant="outlined"
                name="name"
                placeholder="item name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>PRODUCT SERVICE CODE:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="code"
                placeholder="Product service code"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>PRODUCT SERVICE TAG:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="tag"
                placeholder="Product service tag"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>COMPANY SERIAL NUMBER:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="serial"
                placeholder="Company serial number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>COLOUR AND QUANTITY:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="serial"
                placeholder="Colour and quantity"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={style.section}>
            <h4><b>SIM ACKNOWLEDGEMENT</b></h4>
          </div>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
              <p>Item</p>
            </Grid>
            <Grid item xs="11" sm="11" md="11" lg="11" xl="11">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder="Employee name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>SIM PHONE NUMBER:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="number"
                placeholder="Sim number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>PRODUCT SERIAL NUMBER:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="tag"
                placeholder="Product serial number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>COMPANY SERIAL NUMBER:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="serial"
                placeholder="Company serial number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>COLOUR AND QUANTITY:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="serial"
                placeholder="Colour and quantity"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={style.section}>
            <h4><b>ACKNOWLEDGEMENT FORM (OTHER COMPANY ASSET(S)</b></h4>
          </div>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
              <p>Item</p>
            </Grid>
            <Grid item xs="11" sm="11" md="11" lg="11" xl="11">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder="Employee name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
              <p>Product:</p>
            </Grid>
            <Grid item xs="11" sm="11" md="11" lg="11" xl="11">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="number"
                placeholder="Sim number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>COMPANY SERIAL NUMBER:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="serial"
                placeholder="Company serial number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="2" sm="2" md="2" lg="2" xl="2">
              <p>COLOUR AND QUANTITY:</p>
            </Grid>
            <Grid item xs="10" sm="10" md="10" lg="10" xl="10">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="serial"
                placeholder="Colour and quantity"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
              <p>Name:</p>
            </Grid>
            <Grid item xs="11" sm="11" md="11" lg="11" xl="11">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                placeholder="Name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
              <p>DEPARTMENT:</p>
            </Grid>
            <Grid item xs="11" sm="11" md="11" lg="11" xl="11">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="department"
                placeholder="Department"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid item xs="11" sm="11" md="11" lg="11" xl="11">
              <CheckboxFormsy
                className="mb-16 w-full"
                name="accept"
                value={false}
                label="Sign document"
                validations={{
                  equals: true,
                }}
                validationErrors={{
                  equals: "You need to accept"
                }}
              />
            </Grid>
          </Grid>

          <Grid alignItems="center" container item sm="12" md="12" lg="12" xl="12">
            <div className={classes.submit}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mx-auto mt-32 mb-80 w-6/12"
                aria-label="LOG IN"
              // disabled={!isFormValid}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </div>
      </div>
    </Formsy>
  );
};

export default CompanyAssetAcknowledgeForm;



