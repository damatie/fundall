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
import FitnessCenterRoundedIcon from "@material-ui/icons/FitnessCenterRounded";

const useStyles = makeStyles(() => ({
  para: {
    textAlign: 'justify',
    padding: '0 0 2rem 0',
  },
  sections: {
    border: '1px solid #000',
    margin: '2rem 0',
    padding: '0 1rem 1rem 1rem',
  },
  text: {
    textAlign: 'justify',
  },
  span: {
    padding: '1rem 0 0 0',
  }
}));

const CandidateEvaluationForm = () => {
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
            <span className={icon.authIcon}><FitnessCenterRoundedIcon /></span>
            <strong>Candidate Evaluation Form</strong>
          </h2>
        </header>

        <div className={classes.sections}>
          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <span className={classes.span}>Candidate’s Name:</span>
              <TextInput textInputData={''} />
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <span>Position:</span>
              <TextInput textInputData={''} />
            </Grid>
          </Grid>
        </div>

        <div className={classes.sections}>
          <p className={classes.text}>
            Please use this form as a guide to evaluate the applicant’s qualifications for employment. Check the appropriate numeric value corresponding to the applicant’s level of qualification and provide appropriate comments in the space below.
          </p>
        </div>

        <div className={classes.sections}>
          <h4>Rating Scale:</h4>

          <p><strong>1. Unsatisfactory</strong></p>

          <p><strong>2. Below Average—Does not meet requirements</strong></p>

          <p><strong>3. Average- Meets requirements</strong></p>

          <p><strong>4. Above Average-Exceed expectation</strong></p>

          <p><strong>5. Exceptional</strong></p>
        </div>

        <div className={classes.sections}>
          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                <strong>Educational Background:</strong> Does the candidate have the appropriate educational qualification and training for the position.
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <SelectInput
                value=""
                onChange=""
                label="Weighting Factor (F) - 3"
                options={[5, 4, 3, 2, 1]}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                <strong>Prior Work Experience:</strong> Has the candidate acquired necessary skills and qualification through past experiences?
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <SelectInput
                value=""
                onChange=""
                label="Weighting Factor (F) - 5"
                options={[5, 4, 3, 2, 1]}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                <strong>Technical Qualifications/Experience:</strong> Does the candidate have the technical skills required for this position?
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <SelectInput
                value=""
                onChange=""
                label="Weighting Factor (F) - 5"
                options={[5, 4, 3, 2, 1]}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                <strong>Interpersonal/Communication Skills:</strong> How well is the candidate able to express individual ideas, as well as experiences involving team settings?
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <SelectInput
                value=""
                onChange=""
                label="Weighting Factor (F) - 2"
                options={[5, 4, 3, 2, 1]}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                <strong>Candidate Enthusiasm:</strong> How much interest did the candidate show for the position? Why does this person want to work with SpringRock?
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <SelectInput
                value=""
                onChange=""
                label="Weighting Factor (F) - 1"
                options={[5, 4, 3, 2, 1]}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                <strong>Flexibility:</strong> Assess candidate’s adaptability, responsiveness to change, tolerance for ambiguity.
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <SelectInput
                value=""
                onChange=""
                label="Weighting Factor (F) - 1"
                options={[5, 4, 3, 2, 1]}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                <strong>Organizational Fit:</strong> Review the candidates’ potential to fit the unique SpringRock organization, culture and work ethics.
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <SelectInput
                value=""
                onChange=""
                label="Weighting Factor (F) - 1"
                options={[5, 4, 3, 2, 1]}
              />
            </Grid>
          </Grid>

          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <span><strong>TOTAL SCORE (RxF):</strong> 100</span>
            </Grid>
          </Grid>

          <Grid container spacing="4">
            <Grid container item sm="12" md="12" lg="12" xl="12">
              <span>Overall Evaluation Score (%): 100%</span>
              <Textarea placeholder="Please add appropriate comments here" />
            </Grid>
          </Grid>
        </div>

        <div className={classes.sections}>
          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                <strong>Comments/Recommendation by 1st Interviewer:</strong>
              </p>
              <p>
                Is Candidate recommended for 2nd Interview
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <SelectInput
                value=""
                onChange=""
                label="Recommendation"
                options={['Yes', 'No']}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.sections}>
          <Grid container spacing="4" alignItems="center">
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <p>
                <strong>Comments/Recommendation by 2nd Interviewer:</strong>
              </p>
              <p>
                Is Candidate recommended for Hire
              </p>
            </Grid>
            <Grid container item sm="6" md="6" lg="6" xl="6">
              <SelectInput
                value=""
                onChange=""
                label="Recommendation"
                options={['Yes', 'No']}
              />
            </Grid>
          </Grid>
        </div>

        <Grid container spacing="4" alignItems="center">
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <span>Interviewer:</span>
            <TextInput textInputData={''} />
          </Grid>
          <Grid container item sm="6" md="6" lg="6" xl="6">
            <p>Date:</p>
            <Date dateData={''} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CandidateEvaluationForm;
