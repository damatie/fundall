import React from 'react';
import TextInput from '../../../../../shared/inputs/textInputs';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { boxShadows } from '../../../../../styles/boxShadow';
import container from '../../../../../styles/container';
import Date from '../../../../../shared/dates/date';
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import authIcon from '../../../../../styles/authIcon';
import title from '../../../../../styles/title';

const useStyles = makeStyles((theme) => ({
  code: {
    height: '50%',
  }
}));

const MalaroneMalanilAcknowledgementForm = () => {
  //styles
  const card = boxShadows();
  const wrapper = container();
  const icon = authIcon();
  const heading = title();
  const classes = useStyles();

  return (
    <div className={card.card_boxshadow}>
      <div className={classes.code}>
        <div className={wrapper.container}>
          <header className={heading.title}>
            <h2><span className={icon.authIcon}><BubbleChartIcon /></span>Malarone/Malanil Acknowledgement Form.</h2>
          </header>

          <Grid container spacing="10" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" xl="1" alignItems="center">
              <p><strong>Name:</strong></p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" xl="11" alignItems="center">
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="10" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" xl="2" alignItems="center">
              <p><strong>Quantity Received:</strong></p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10" alignItems="center" >
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="10" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" xl="2" alignItems="center">
              <p><strong>Signature:</strong></p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10" alignItems="center">
              <TextInput textInputData={''} />
            </Grid>
          </Grid>

          <Grid container spacing="10" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" xl="1" alignItems="center" >
              <p><strong>Date:</strong></p>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center" >
              <Date dateData={''} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default MalaroneMalanilAcknowledgementForm;
