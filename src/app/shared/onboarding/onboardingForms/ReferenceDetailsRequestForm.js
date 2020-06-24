import React from 'react';
import TextInput from '../../../../../shared/inputs/textInputs';
import EmailInput from '../../../../../shared/inputs/emailInput';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { boxShadows } from '../../../../../styles/boxShadow';
import container from '../../../../../styles/container';
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import authIcon from '../../../../../styles/authIcon';
import title from '../../../../../styles/title';

const useStyles = makeStyles(() => ({
  border: {
    width: '100%',
    height: '5px',
    borderTop: '2px dashed',
    borderBottom: '2px dashed',
    margin: '2rem 0',
  }
}));

const ReferenceDetailRequestForm = () => {
  //styles
  const classes = useStyles();
  const wrapper = container();
  const card = boxShadows();
  const spanWrapper = authIcon();
  const titleWrapper = title();

  return (
    <div className={card.card_boxshadow}>
      <div className={wrapper.container}>
        <header className={titleWrapper.title}>
          <h4>
            <span className={spanWrapper.authIcon}><AttachMoneyRoundedIcon /></span>
            <strong>REFERENCE DETAILS REQUEST FORM</strong>
          </h4>
        </header>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>EMPLOYEE NAME:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>NAME OF REFEREE:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>PHONE NUMBER:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>ADDRESS:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>EMAIL:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <EmailInput emailInputData={''} />
          </Grid>
        </Grid>

        <div className={classes.border}>
        </div>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>EMPLOYEE NAME:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>NAME OF REFEREE:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>PHONE NUMBER:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>ADDRESS:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <p>EMAIL:</p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9">
            <EmailInput emailInputData={''} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ReferenceDetailRequestForm;