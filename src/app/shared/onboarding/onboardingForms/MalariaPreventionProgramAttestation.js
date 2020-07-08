import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LocalHotelRoundedIcon from "@material-ui/icons/LocalHotelRounded";
import Formsy from 'formsy-react';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import { inputStyles } from '../../EmployeeFormInput';
import SelectFormsy from '../../selectInput/SelectInput';

const useStyles = makeStyles((theme) => ({
  align: {
    marginLeft: '2rem',
  }
}));

const MalariaPreventionProgramAttestation = () => {
  //styles
  const classes = useStyles();
  const card = inputStyles();

  const feed = ['Yes', 'No'];

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
            <Grid container item sm="1" md="1" lg="1" xl="1">
              <p>Name:</p>
            </Grid>
            <Grid container item sm="11" md="11" lg="11" xl="11">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Name"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="5" md="5" lg="5" xl="5">
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
            <Grid container item sm="1" md="1" lg="1" xl="1">
              <p>Date:</p>
            </Grid>
            <Grid container item sm="5" md="5" lg="5" xl="5">
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="date"
                variant="outlined"
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
                name="date"
                variant="outlined"
              />

            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <span><strong>Arrived from</strong></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="arrived_from"
                label="Arrived from"
                variant="outlined"
              />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4">
              <span><strong>Expected Duration of Stay</strong></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="expected_stay"
                label="Expected Duration of Stay"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <h4 style={{ margin: '0 0 1rem 0' }}>Select Yes or No</h4>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="3" md="3" lg="3" xl="3">
              <SelectFormsy
                value=""
                name="pre-arrival"
                onChange=""
                label="Pre-arrival information"
                options={feed}
                variant="outlined"
              />
            </Grid>
            <Grid container item sm="3" md="3" lg="3" xl="3">
              <SelectFormsy
                className="mb-16 w-full"
                value=""
                name="face-to-face"
                onChange=""
                label="Face-to-Face"
                options={feed}
                variant="outlined"
              />
            </Grid>
            <Grid container item sm="3" md="3" lg="3" xl="3">
              <SelectFormsy
                className="mb-16 w-full"
                value=""
                onChange=""
                name="preventive"
                label="Malarone (Preventive Med.) Received"
                options={feed}
                variant="outlined"
              />
            </Grid>
            <Grid container item sm="3" md="3" lg="3" xl="3">
              <SelectFormsy
                className="mb-16 w-full"
                value=""
                name="kit"
                onChange=""
                label="Malaria Kit Received"
                options={feed}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <h4 style={{ margin: '0 0 1rem 0' }}>Instructor</h4>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
              <span><strong>Name</strong></span>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
              <div className={classes.align}>
                <span style={{ marginBottom: '0.5rem', display: 'inline-block' }} ><strong>Signature</strong></span>
                <TextFieldFormsy
                  className="mb-16 w-full"
                  type="file"
                  name="signature"
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
              <p><strong>Date</strong></p>
              <TextFieldFormsy
                className="mb-16 w-full"
                type="date"
                name="date"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid alignItems="center" container item sm="12" md="12" lg="12" xl="12">
            <div className={card.submit}>
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

export default MalariaPreventionProgramAttestation;
