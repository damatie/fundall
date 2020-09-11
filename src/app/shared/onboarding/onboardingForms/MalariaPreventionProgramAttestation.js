import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LocalHotelRoundedIcon from "@material-ui/icons/LocalHotelRounded";
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import { inputStyles } from '../../EmployeeFormInput';
import SelectFormsy from '../../selectInput/SelectInput';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Typography } from '@material-ui/core';
import SharedDropzone from 'app/shared/sharedDropZone';

const useStyles = makeStyles((theme) => ({
  align: {
    marginLeft: '2rem',
  }
}));

const MalariaPreventionProgramAttestation = props => {
  // initial form data
  const initialFormData = {
    employeeName: '',
    dateOfArrival: '',
    instructorSignature: '',
    expectedDurationOfStay: '',
    preArrivalInformation: '',
    faceToFaceOrientation: '',
    malanilPreventiveMedicationReceived: '',
    malariaKitReceived: '',
    instructorName: '',
    date: '',
    arrivedFrom: '',
  };

  //styles
  const classes = useStyles();
  const card = inputStyles();

  const [data, setData] = useState({});
  const [instructorSignature, setInstructorSignature] = useState({});

  const feed = ['Yes', 'No'];

  const { id } = useParams();

  const { handleChange, form } = useForm(initialFormData);

  const handleOnBlur = () => {
    props.setFormData({
      ...form,
      instructorSignature: instructorSignature
    });
  }

  return (
    <Formsy>
      <div className={card.formField}>
        <div className={card.container}>
          <header className={card.title}>
            <h2>
              <span className={card.AuthIcon}><LocalHotelRoundedIcon /></span>MALARIA PREVENTION PROGRAM attestation</h2>
          </header>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <p style={{ margin: '1rem 0 0 0' }}>
                I understand that SpringRock is committed to a safe, healthy, and productive workplace for all employees. Accordingly, the  Company has implemented a Malaria Prevention Program with the stand goal of no cases of malaria among it's non-immune population in Nigeria.
                   </p>
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <p>
                I also understand that I am considered "non-immune" with respect to malaria.
                   </p>
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <p>
                I confirmed that I have been provided with information about the Malaria Prevention Program and undertake to abide by the advice and training that I have received and to take necessary steps to prevent myself from getting malaria is a life-threating disease but it is avoidable and treatable. I recognize that I have personal responsibility for ensuring that I do not get infected and that in the event, that after following all the guidelines given, that I do get, I undertake, regardless of whatever country I am in, to act quickly and accordingly to the training I have received to forestall and avert severe health consequences which could lead to death.
                   </p>
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="6" lg="6" xl="6">
              <span><strong>Employee name</strong></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="employeeName"
                label="Employee name"
                variant="outlined"
                value={data.employeeName}
                onChange={handleChange}
                onBlur={handleOnBlur}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <div style={{ marginBottom: '0' }}>
                <span><strong>Date of Arrival</strong></span>
              </div>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="dateOfArrival"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleOnBlur}
                value={data.dateOfArrival}
              />

            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <span><strong>Arrived from</strong></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="arrivedFrom"
                // label="Arrived from"
                variant="outlined"
                value={data.arrivedFrom}
                onChange={handleChange}
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <span><strong>Expected Duration of Stay</strong></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="expectedDurationOfStay"
                // label="Expected Duration of Stay"
                variant="outlined"
                placeholder='E.g 2 months, 2 years'
                onChange={handleChange}
                onBlur={handleOnBlur}
                value={data.expectedDurationOfStay}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" fontWeight='bold' color="initial" style={{ margin: '2rem 1rem' }}>Select Yes or No</Typography>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="3" md="3" lg="3" xl="3">
              <span><strong>Pre Arrival Information</strong></span>
              <SelectFormsy
                value={data.preArrivalInformation}
                name="preArrivalInformation"
                onChange={handleChange}
                label=""
                options={feed}
                variant="outlined"
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid container item sm="3" md="3" lg="3" xl="3">
              <span><strong>Face To Face Durarion</strong></span>
              <SelectFormsy
                className="mb-16 w-full"
                value={data.faceToFaceOrientation}
                name="faceToFaceOrientation"
                onChange={handleChange}
                options={feed}
                variant="outlined"
                onBlur={handleOnBlur}
                label=""
              />
            </Grid>
            <Grid container item sm="3" md="3" lg="3" xl="3">
              <span><strong>Malarone Preventive Medical Received</strong></span>
              <SelectFormsy
                className="mb-16 w-full"
                value={data.malanilPreventiveMedicationReceived}
                onChange={handleChange}
                name="malanilPreventiveMedicationReceived"
                label=""
                options={feed}
                variant="outlined"
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid container item sm="3" md="3" lg="3" xl="3">
              <span><strong>Malaria Kit Received</strong></span>
              <SelectFormsy
                className="mb-16 w-full"
                value={data.malariaKitReceived}
                name="malariaKitReceived"
                onChange={handleChange}
                options={feed}
                variant="outlined"
                onBlur={handleOnBlur}
                label=""
              />
            </Grid>
          </Grid>

          <Typography variant="h6" fontWeight='bold' color="initial" style={{ margin: '2rem 1rem' }}>Instructor</Typography>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
              <span><strong>Instructor Name</strong></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="instructorName"
                variant="outlined"
                value={data.instructorName}
                onChange={handleChange}
                onBlur={handleOnBlur}
              />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
              <div className={classes.align}>
                <span style={{ marginBottom: '0.5rem', display: 'inline-block' }} ><strong>Signature</strong></span>
                <SharedDropzone setValue={setInstructorSignature} />
              </div>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
              <p><strong>Date</strong></p>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="date"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleOnBlur}
                value={data.data}
              />
            </Grid>
          </Grid>

        </div>
      </div>
    </Formsy>
  );
};

export default MalariaPreventionProgramAttestation;
