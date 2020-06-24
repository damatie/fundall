import React from 'react';
import TextInput from '../../../../../shared/inputs/textInputs';
import Date from '../../../../../shared/dates/date';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { boxShadows } from '../../../../../styles/boxShadow';
import container from '../../../../../styles/container';
import authIcon from '../../../../../styles/authIcon';
import title from '../../../../../styles/title';
import SelectInput from '../../../../../shared/inputs/selectInput';
import Textarea from '../../../../../shared/textarea/textarea';
import FileInput from '../../../../../shared/inputs/fileInput';
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import bullet from '../../../../../assets/images/bullet.png';


const useStyles = makeStyles(() => ({
  center: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    margin: '0 0 1rem 0',
  },
  spacing: {
    margin: '0 2rem',
  }
}));

const StaffConfirmationAppraisalForm = () => {
  //styles
  const card = boxShadows();
  const wrapper = container();
  const icon = authIcon();
  const heading = title();
  const classes = useStyles();

  return (
    <div className={card.card_boxshadow}>
      <div className={wrapper.container}>
        <header className={heading.title}>
          <h2>
            <span className={icon.authIcon}>
              <CheckCircleOutlineRoundedIcon />
            </span>
            <strong>
              CONFIRMATION APPRAISAL FORM
            </strong>
          </h2>
        </header>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="2" md="2" lg="2" xl="2" >
            <p><strong>EMPLOYEE’S NAME:</strong></p>
          </Grid>
          <Grid container item sm="10" md="10" lg="10" xl="10" >
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <span><strong>GRADE:</strong></span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <span><strong>JOB POSITION:</strong></span>
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <span><strong>ENTITY:</strong></span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <span><strong>LOCATION:</strong></span>
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <h4>
          <strong>
            PERSONAL DATA (SUPERVISOR/MANAGER):
          </strong>
        </h4>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="3" md="3" lg="3" xl="3" >
            <p><strong>SUPERVISOR/MANAGER’S NAME:</strong></p>
          </Grid>
          <Grid container item sm="9" md="9" lg="9" xl="9" >
            <TextInput textInputData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6" >
            <span><strong>DESIGNATION:</strong></span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="4" md="4" lg="4" xl="4" >
            <p><strong>Date:</strong></p>
            <Date DateData={''} />
          </Grid>
        </Grid>

        <p>Definition of Rating Parameters and the applicable scores (points):</p>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12" >
            <p>
              <span>
                <img src={bullet} alt="bullet img" />
              </span>
              <span className={classes.spacing}>
                <strong>POOR</strong>
              </span>
              <span>
                - Does not meet minimum job requirement. Needs excessive level of supervision. Unsuitable for the job – <strong>1</strong>
              </span>
            </p>
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12" >
            <p>
              <span>
                <img src={bullet} alt="bullet img" />
              </span>
              <span className={classes.spacing}>
                <strong>FAIR</strong>
              </span>
              <span>
                - Does not meet minimum job requirement and requires significant level of Supervision. – <strong>2</strong>
              </span>
            </p>
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12" >
            <p>
              <span>
                <img src={bullet} alt="bullet img" />
              </span>
              <span className={classes.spacing}>
                <strong>SATISFACTORY</strong>
              </span>
              <span>
                - Meets minimum job requirement but sometimes requires supervision. – <strong>3</strong>
              </span>
            </p>
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12" >
            <p>
              <span>
                <img src={bullet} alt="bullet img" />
              </span>
              <span className={classes.spacing}>
                <strong>GOOD</strong>
              </span>
              <span>
                - Slightly exceeds job requirement without supervision. – <strong>4</strong>
              </span>
            </p>
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12" >
            <p>
              <span>
                <img src={bullet} alt="bullet img" />
              </span>
              <span className={classes.spacing}>
                <strong>OUTSTANDING</strong>
              </span>
              <span>
                - Far exceeds job requirement. – <strong>5</strong>
              </span>
            </p>
          </Grid>
        </Grid>

        <h4>
          <strong>GENERAL PERFORMANCE REVIEW</strong>
        </h4>

        <p>
          <strong>PART I – PERSONAL CHARACTERISTICS</strong>
        </p>

        <p><strong>Parameters</strong></p>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>1.</span>
             Punctuality at work, meetings,scheduled appointments, etc.
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Punctuality..."
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>2.</span>
             Commitment/ self-motivation.
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Commitment..."
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>3.</span>
             Initiative
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Initiative"
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>4.</span>
             Cooperation with supervisors &subordinates.
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Cooperation..."
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>5.</span>
             Confidentiality/ Integrity.
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Confidentiality..."
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <p>
          <strong>TOTAL SCORE = 5</strong>
        </p>

        <p>
          Minimum performance levels for <strong>POOR</strong>, <strong>FAIR</strong>, <strong>SATISFACTORY</strong>, <strong>GOOD</strong> and <strong>OUTSTANDING</strong> ratings are stated below. You are expected to rate based on performance scores above.
        </p>

        <p>Below 2 = <strong>Poor</strong></p>
        <p>2 - 2.49 = <strong>Fair</strong></p>
        <p>2.5 - 3.49 = <strong>Satisfactory</strong></p>
        <p>3.5 - 4.49 = <strong>Good</strong></p>
        <p>4.5 - 5.0 = <strong>Outstanding</strong></p>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <strong>
                Final Rating is= Total Score/ 5, then tick box with applicable score.
              </strong>
            </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Final rating"
              options={['Poor', 'Fair', 'Satisfactory', 'Good', 'Outstanding']}
            />
          </Grid>
        </Grid>

        <p>
          <strong>PART II – ADMINISTRATIVE/ BEHAVIOURAL & JOB COMPETENCE</strong>
        </p>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>1.</span>
             Work organization & co-ordination.
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Work organization..."
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>2.</span>
             Speed/Timeliness of work.
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Speed/Timeliness..."
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>3.</span>
             Quantity & Quality of work.
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Quantity & Quality..."
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>4.</span>
             Ability to work under pressure.
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Ability to work..."
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>4.</span>
             Performance without supervision.
          </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Performance without..."
              options={[1, 2, 3, 4, 5]}
            />
          </Grid>
        </Grid>

        <p>
          <strong>TOTAL SCORE = 5</strong>
        </p>

        <p>Below 2 = <strong> Poor</strong></p>
        <p>2 - 2.49 = <strong> Fair</strong></p>
        <p>2.5 - 3.49 = <strong> Satisfactory</strong></p>
        <p>3.5 - 4.49 = <strong> Good</strong></p>
        <p>4.5 - 5.0 = <strong> Outstanding</strong></p>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <strong>
                Final Rating is = Total Score/ 5, then tick box with applicable score.
              </strong>
            </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Final rating"
              options={['Poor', 'Fair', 'Satisfactory', 'Good', 'Outstanding']}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>
              <span>
                <strong>RECOMMENDATION: </strong>
              </span>
           Tick any of the following
        </p>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <SelectInput
              value=""
              onChange=""
              label="Recommendation"
              options={['Confirm', 'Promote', 'Merit Increment', 'Disengage', 'Defer confirmation by: 3 Months', 'Defer confirmation by: 6 Months']}
            />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12">
            <span><strong>SUPERVISOR’S COMMENTS</strong></span>
            <Textarea placeholder="SUPERVISOR’S COMMENTS..." />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <div>
              <p><strong>SUPERVISOR’S SIGNATURE</strong></p>
              <FileInput />
            </div>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p><strong>Date</strong></p>
            <Date dateData={''} />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="12" md="12" lg="12" xl="12">
            <span><strong>HUMAN RESOURCES COMMENTS</strong></span>
            <Textarea placeholder="SUPERVISOR’S COMMENTS..." />
          </Grid>
        </Grid>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <div>
              <p><strong>HUMAN RESOURCES SIGNATURE</strong></p>
              <FileInput />
            </div>
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p><strong>Date</strong></p>
            <Date dateData={''} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default StaffConfirmationAppraisalForm;
