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
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import SelectInput from '../../../../../shared/inputs/selectInput';
import TextField from '@material-ui/core/TextField';
import axaImg from '../../../../../assets/images/axatpa.PNG';

const useStyles = makeStyles(() => ({

}));

const AxaMansardTPAProposalForm = () => {
  //styles
  const classes = useStyles();
  const card = boxShadows();
  const wrapper = container();

  //handle religion
  const handleReligion = (e) => {

  };

  //religion input data
  const religionInputData = {
    label: 'Religion',
    placeholder: 'Religion',
    onChange: handleReligion
  };

  //handle occupation
  const handleOccupation = (e) => {

  };

  //occupation input data
  const occupationInputData = {
    label: 'Occupation',
    placeholder: 'Occupation',
    onChange: handleOccupation
  };


  return (
    <div className={card.card_boxshadow}>
      <div className={wrapper.container}>
        <header>
          <Grid container spacing="2" alignItems="center">
            <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
              <img src={axaImg} alt="Axa Mansard TPA logo" />
            </Grid>
            <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
              <p><strong>AXA Mansard TPA Proposal Form</strong></p>
            </Grid>
            <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
              <p>
                <strong>
                  “AN INDIVIDUAL WHO ASSISTS AN APPLICANT TO COMPLETE THIS PROPOSAL FORM FOR INSURANCE SHALL BE DEEMED TO HAVE DONE SO AS THE AGENT OF THE APPLICANT”
                </strong>
              </p>
            </Grid>
          </Grid>
        </header>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" lx="6" alignItems="center">
            <span><strong>Surname:</strong></span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" lx="6" alignItems="center">
            <span><strong>Other names:</strong></span>
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" lx="3" alignItems="center">
            <SelectInput
              value=""
              onChange=""
              label="Title"
              options={['Mr', 'Mrs', 'Miss', 'Others']} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <span><strong>Date:</strong></span><Date />
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" alignItems="center">
            <TextInput textInputData={religionInputData} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" lx="6" alignItems="center">
            <TextInput textInputData={occupationInputData} />
          </Grid>
          <Grid container item sm="3" md="3" lg="3" lx="3" alignItems="center">
            <SelectInput
              value=""
              onChange=""
              label="Marital Status"
              options={['Single', 'Married', 'Divorced', 'Widowed']}
            />
          </Grid>
          <Grid container item sm="3" md="3" lg="3" lx="3" alignItems="center">
            <SelectInput
              value=""
              onChange=""
              label="Sex"
              options={['Male', 'Female']}
            />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p><strong>Job title Employer:</strong></p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
            <p><strong>Hobbies:</strong></p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>Means of Identification:</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>Identification Number:</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <span>Facebook ID:</span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <span>Linked-in ID:</span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <span>Twitter ID:</span>
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <span>Telephone:</span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <span>Mobile No:</span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <span>E-mail:</span>
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p><strong>Address:</strong></p>
          </Grid>
          <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>Sate of Residence:</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>Local Government Area:</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>Blood Group:</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
            <p>Genotype:</p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>Choice of Hospital (Primary)</p>
          </Grid>
          <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <p>
              State any Pre-Existing Medical Condition (Diabetes, hypertension, Sickle cell, Cancer….)
            </p>
          </Grid>
          <Grid container item sm="8" md="8" lg="8" lx="8" alignItems="center">
            <TextInput textInputData={""} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" lx="3" alignItems="center">
            <p>
              Initial LumpSum to deposit for healthcare service:
            </p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" lx="9" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="8" md="8" lg="8" lx="8" alignItems="center">
            <p>
              ARE THERE ANY ADDITIONAL FACTS AFFECTING THE RISK OF ASSURANCE ON YOUR HEALTH OF WHICH THE COMPANY SHOULD BE MADE
              AWARE?
            </p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <SelectInput
              value=""
              onChange=""
              label="Answer"
              options={['Yes', 'No']}
            />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>
              IF YES, STATE DETAILS:
            </p>
          </Grid>
          <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <h4><strong>DECLARATION</strong></h4>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
            <p>I,</p>
          </Grid>
          <Grid container item sm="3" md="3" lg="3" lx="3" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="8" md="8" lg="8" lx="8" alignItems="center">
            <p>
              the Life assured, do hereby declare that all the foregoing answers are true, that I have not concealed nor withheld anything with which the assurer should be acquainted with in order to assess my eligibility for assurance.
              </p>
          </Grid>
        </Grid>

        <p>
          I agree that these and all statements I have made or shall make to the assurer or to its medical examiner(s) in connection with this or previous proposal(s) shall be the basis of this contract.
        </p>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>Client Signature:</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <TextField
              accept="image/*"
              id="outlined-secondary"
              type="file"
              variant="outlined"
              onChange=""
            />
          </Grid>
          <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
            <p>Date:</p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" alignItems="center">
            <Date />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
            <p>AGENT:</p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="1" md="1" lg="1" lx="2" alignItems="center">
            <p>AGENT CODE</p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
            <p>SBU:</p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
            <p>SBU CODE:</p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="1" md="1" lg="1" lx="1" alignItems="center">
            <p>AGENT’S SIGNATURE</p>
          </Grid>
          <Grid container item sm="5" md="5" lg="5" lx="5" alignItems="center">
            <TextField
              accept="image/*"
              id="outlined-secondary"
              type="file"
              variant="outlined"
              onChange=""
            />
          </Grid>
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>Sub Agent Name (if Applicable)</p>
          </Grid>
          <Grid container item sm="4" md="4" lg="4" lx="4" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="2" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" lx="2" alignItems="center">
            <p>Client’s risk category:</p>
          </Grid>
          <Grid container item sm="10" md="10" lg="10" lx="10" alignItems="center">
            <TextInput textInputData={''} />
          </Grid>
        </Grid>
      </div>
    </div >
  );
};

export default AxaMansardTPAProposalForm;

