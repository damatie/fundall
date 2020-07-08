import React from 'react';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { inputStyles } from '../../EmployeeFormInput';
import Grid from '@material-ui/core/Grid';
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import Formsy from 'formsy-react';

const useStyles = makeStyles((theme) => ({
  code: {
    height: '50%',
  }
}));

const MalaroneMalanilAcknowledgementForm = () => {
  //styles
  const card = inputStyles();

  return (
    <Formsy>
      <div className={card.formField}>
        <div className={card.container}>
          <header className={card.title}>
            <h2><span className={card.AuthIcon}><BubbleChartIcon /></span>EXTRA - Malarone/Malanil Acknowledgement Form.</h2>
          </header>

          <br />

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" xl="1" alignItems="center">
              <p><strong>Name:</strong></p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" xl="11" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="Name"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="2" md="2" lg="2" xl="2" alignItems="center">
              <p><strong>Quantity Received:</strong></p>
            </Grid>
            <Grid container item sm="10" md="10" lg="10" xl="10" alignItems="center" >
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                variant="outlined"
                placeholder="Quantity Received"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" xl="1" alignItems="center">
              <p><strong>Signature:</strong></p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" xl="11" alignItems="center">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="file"
                name="signature"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="1" md="1" lg="1" xl="1" alignItems="center" >
              <p><strong>Date:</strong></p>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center" >
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="name"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Formsy>
  );
};

export default MalaroneMalanilAcknowledgementForm;
