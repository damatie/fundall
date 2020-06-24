import React from 'react';
import TextInput from '../../../../../shared/inputs/textInputs';
import EmailInput from '../../../../../shared/inputs/emailInput';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { boxShadows } from '../../../../../styles/boxShadow';
import container from '../../../../../styles/container';
import Date from '../../../../../shared/dates/date';
import LocalHotelRoundedIcon from "@material-ui/icons/LocalHotelRounded";
import authIcon from '../../../../../styles/authIcon';
import title from '../../../../../styles/title';
import SelectInput from '../../../../../shared/inputs/selectInput';
import FileInput from '../../../../../shared/inputs/fileInput';

const useStyles = makeStyles((theme) => ({
  align: {
    marginLeft: '2rem',
  }
}));

const MalariaPreventionProgramAttestation = () => {
  //styles
  const classes = useStyles();
  const card = boxShadows();
  const wrapper = container();
  const heading = title();
  const icon = authIcon();

  return (
    <div className={card.card_boxshadow}>
      <div className={wrapper.container}>
        <header className={heading.title}>
          <h4>
            <span className={icon.authIcon}><LocalHotelRoundedIcon /></span>MalariaPreventionProgramAttestation</h4>
        </header>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12">
            I understand that SpringRock is committed to a safe, healthy, and productive workplace for all employees. Accordingly, the  Company has implemented a Malaria Prevention Program with the stand goal of no cases of malaria among it's non-immune population in Nigeria.
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12">
            I also understand that I am considered "non-immune" with respect to malaria.
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12">
            I confirmed that I have been provided with information about the Malaria Prevention Program and undertake to abide by the advice and training that I have received and to take necessary steps to prevent myself from getting malaria is a life-threating disease but it is avoidable and treatable. I recognize that I have personal responsibility for ensuring that I do not get infected and that in the event, that after following all the guidelines given, that I do get, I undertake, regardless of whatever country I am in, to act quickly and accordingly to the training I have received to forestall and avert severe health consequences which could lead to death.
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="1" md="1" lg="1" xl="1">
            <p>Name:</p>
          </Grid>
          <Grid container item sm="11" md="11" lg="11" xl="11">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="1" md="1" lg="1" xl="1">
            <p>Signature:</p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" xl="5">
            <FileInput onChange={''} />
          </Grid>
          <Grid container item sm="1" md="1" lg="1" xl="1">
            <p>Date:</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4">
            <Date dateData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4">
            <span><strong>Date of Arrival</strong></span>
            <Date dateData={''} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4">
            <span><strong>Arrived from</strong></span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4">
            <span><strong>Expected Duration of Stay</strong></span>
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <h4>Select Yes or No</h4>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <SelectInput
              value=""
              onChange=""
              label="Pre-arrival information"
              options={['Yes', 'No']}
            />
          </Grid>
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <SelectInput
              value=""
              onChange=""
              label="Face-to-Face"
              options={['Yes', 'No']}
            />
          </Grid>
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <SelectInput
              value=""
              onChange=""
              label="Malarone (Preventive Medication) Received"
              options={['Yes', 'No']}
            />
          </Grid>
          <Grid container item sm="3" md="3" lg="3" xl="3">
            <SelectInput
              value=""
              onChange=""
              label="Malaria Kit Received"
              options={['Yes', 'No']}
            />
          </Grid>
        </Grid>

        <h4>Instructor</h4>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <span><strong>Name</strong></span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <div className={classes.align}>
              <span style={{ marginBottom: '0.5rem', display: 'inline-block' }} ><strong>Signature</strong></span>
              <FileInput onChange={''} />
            </div>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <p><strong>Date</strong></p>
            <Date dateData={''} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MalariaPreventionProgramAttestation;
