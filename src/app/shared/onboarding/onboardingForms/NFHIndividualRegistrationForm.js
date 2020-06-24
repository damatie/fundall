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
import TextField from '@material-ui/core/TextField';
import { Checkbox } from '@material-ui/core';
import SelectInput from '../../../../../shared/inputs/selectInput';
import fmbnImg from '../../../../../assets/images/fmbn.PNG';

const useStyles = makeStyles(() => ({
  border: {
    width: '100%',
    height: '5px',
    borderTop: '2px solid',
    borderBottom: '2px solid',
    margin: '2rem 0',
  },
  fct: {
    display: 'inline-block',
    margin: '0 0 0 15rem',
  },
  display: {
    display: 'flex',
  },
  para: {
    textAlign: 'end',
  },
  center: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    margin: '0 0 1rem 0',
  }
}));

const NFHIndividualRegistrationForm = () => {
  //styles
  const classes = useStyles();
  const card = boxShadows();
  const wrapper = container();

  return (
    <div className={card.card_boxshadow}>
      <div className={wrapper.container}>
        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <img src={fmbnImg} alt="FMBN logo" />
          </Grid>
          <Grid container item sm="8" md="8" lg="8" xl="8" alignItems="center">

            <div>
              <h2><strong>FEDERAL MORTGAGE BANK OF NIGERIA</strong></h2>
              <div className={classes.center}>
                <span>(National Housing Fund Decree 3, 1992)</span>
              </div>
            </div>
          </Grid>
        </Grid>

        <div>
          <p className={classes.para}>NHF.2</p>
        </div>

        <div className={classes.title}>
          <h4>INDIVIDUAL REGISTRATION FORM</h4>
        </div>

        <div>
          <p>A. <span>Please read the form carefully before completing it.</span></p>
          <p>B. <span>The completed form should be returned with two password photographs with your name boldly written on the reverse side.</span></p>
          <p>C. <span>Return the completed form to:</span></p>
        </div>


        <p><strong>The Managing Director/Chief Executive,</strong></p><br />
        <p><strong>Federal Mortgage Bank of Nigeria,</strong></p>
        <p><strong>(NFH Registration)</strong></p>
        <p><strong>Plot 266, Cadastral AO,</strong></p>
        <p><strong>Central Business District</strong></p>
        <p><strong>F.C.T ABUJA</strong> <span className={classes.fct}>(OR to the FMBN office in your State.)</span></p>
        <p><strong>Tel: 09-4602102</strong></p>
        <p><strong>Email: info@fmbnigeria.org</strong></p>
        <p><strong>Website: www.fmbnigeria.org</strong></p>


        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12" alignItems="center">
            <h4>
              <strong>EMPLOYMENT STATUS</strong>
              <span>(As at date of completing this form)</span>
            </h4>
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <SelectInput
              value=""
              onChange=""
              label="Employment status"
              options={['Employed full-time', 'Employed part-time', 'self-employed']}
            />
          </Grid>
          <Grid container item sm="2" md="2" lg="2" xl="2" alignItems="center">
            <p><strong>EMPLOYER'S NUMBER</strong></p>
            <span>(if not self-employed)</span>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <SelectInput
              value=""
              onChange=""
              label="Title"
              options={['Mr', 'Mrs', 'Miss', 'Others']}
            />
          </Grid>
          <Grid container item sm="8" md="8" lg="8" xl="8" alignItems="center">
            <TextInput textInputData={{ placeholder: 'Surname' }} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" alignItems="center">
            <p>First Name(s)</p>
          </Grid>
          <Grid container item sm="10" md="10" lg="10" xl="10" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="8" md="8" lg="8" xl="8" alignItems="center">
            <TextInput textInputData={{ placeholder: 'Address' }} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <Date />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="8" md="8" lg="8" xl="8" alignItems="center">
            <TextInput textInputData={{ placeholder: 'State' }} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <TextInput
              textInputData={{ placeholder: 'Basic Salary/Income P.A/Naira' }}
            />
          </Grid>
        </Grid>

        <h4><strong>NEXT OF KIN DETAILS</strong></h4>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" alignItems="center">
            <TextInput textInputData={{ placeholder: 'Next of Kin Name' }} />
          </Grid>
          <Grid container item sm="10" md="10" lg="10" xl="10" alignItems="center">
            <TextInput textInputData={{ placeholder: 'Address' }}
            />
          </Grid>
        </Grid>

        <h4>
          <strong>NEW EMPLOYMENT</strong>
          <h4>DETAILS</h4>
        </h4>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" alignItems="center">
            <TextInput textInputData={{ placeholder: 'Contributor\'s Number' }} />
          </Grid>
          <Grid container item sm="10" md="10" lg="10" xl="10" alignItems="center">
            <TextInput textInputData={{ placeholder: 'New Employer\'s Number' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" alignItems="center">
            <p>Employer's Name</p>
          </Grid>
          <Grid container item sm="10" md="10" lg="10" xl="10" alignItems="center">
            <TextInput textInputData={''}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <TextField
              accept="image/*"
              id="outlined-secondary"
              type="file"
              variant="outlined"
              onChange=""
            />
            <span>Applicant's Signature and Thumb Print</span>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <TextField
              accept="image/*"
              id="outlined-secondary"
              type="file"
              variant="outlined"
              onChange=""
            />
            <span>Employer's Signature, Date & Official Stamp</span>
          </Grid>
        </Grid>

        <div className={classes.border}>
        </div>

        <h4><strong>FOR FMBN USE ONLY</strong></h4>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <span>Date Received</span>
            <Date />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <span>Ref No.</span>
            <TextInput textInputData={{ placeholder: 'Ref No.' }} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" alignItems="center">
            <TextInput textInputData={{ placeholder: 'Initial & Date' }} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <span>Participation No. Issued/verified</span>
            <TextInput textInputData={{ placeholder: 'Ref No.' }} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <span>Initial & Date</span>
            <TextInput textInputData={{ placeholder: 'Initial & Date' }} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <span>Date file created</span>
            <TextInput textInputData={{ placeholder: 'Date file created' }} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <span>Initial & Date</span>
            <TextInput textInputData={{ placeholder: 'Initial & Date' }} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <span>Acknowledgement sent</span>
            <TextInput textInputData={{ placeholder: 'Acknowledgement sent' }} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <span>Initial & Date</span>
            <TextInput textInputData={{ placeholder: 'Initial & Date' }} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <span>Checked By</span>
            <TextInput textInputData={{ placeholder: 'Name' }} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" alignItems="center">
            <span>Initial & Date</span>
            <TextInput textInputData={{ placeholder: 'Initial & Date' }} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NFHIndividualRegistrationForm;