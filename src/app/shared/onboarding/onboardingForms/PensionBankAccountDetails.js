import React from 'react';
import TextInput from '../../../../../shared/inputs/textInputs';
import EmailInput from '../../../../../shared/inputs/emailInput';
import Date from '../../../../../shared/dates/date';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { boxShadows } from '../../../../../styles/boxShadow';
import container from '../../../../../styles/container';
import authIcon from '../../../../../styles/authIcon';
import title from '../../../../../styles/title';
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles(() => ({

}));

const PensionBankAccountDetails = () => {
  //styles
  const classes = useStyles();
  const card = boxShadows();
  const wrapper = container();
  const header = title();
  const icon = authIcon();

  return (
    <div className={card.card_boxshadow}>
      <div className={wrapper.container}>
        <div className={header.title}>
          <h2>
            <span className={icon.authIcon}><AttachMoneyRoundedIcon /></span>
            <strong>PENSION BANK ACCOUNT DETAILS FORM</strong>
          </h2>
        </div>

        <h4><strong>Personal Details</strong></h4>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Title</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Other Names</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Surname</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Given Names</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Date of Birth</strong></p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4">
            <Date />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Address</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>State</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Post Code</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Mobile No.</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Email Address</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <EmailInput emailInputData={''} />
          </Grid>
        </Grid>

        <h4><strong>Account Details</strong></h4>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Name of PFA</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>Address of PFA</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p><strong>RSA No (PIN)</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <h4>
          <strong>
            Signature : I hereby authorize SREL to credit my nominated pension entitlement directly to my account as detailed above.
        </strong>
        </h4>

        <Grid container spacing="1" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Checkbox /> <span>Sign document</span>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Date />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PensionBankAccountDetails;