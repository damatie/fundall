import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountSettings from './accountsettings';
import OrganizationInformation from './orginfo';
import EntitiesAndDepartments from './entitiesanddepts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
      { 
        id: 1,
        title: 'Account Settings', 
        details: 'Configure standards used in your organization'
      }, 
      {
        id: 2,
        title: 'Organization Information', 
        details: 'Organization information to get the system up and running'
      }, 
      {
        id: 3,
        title: 'Entities & Departments', 
        details: 'Configure entities and departments in your organization'
      }
    ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <><AccountSettings/></>;
    case 1:
      return <><OrganizationInformation/></>;
    case 2:
      return <><EntitiesAndDepartments/></>;
    default:
      return <></>;
  }
}

export default function StepperMain() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label.id}>
            <StepLabel>{label.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
        //   <div>
        //     <Typography className={classes.instructions}>All steps completed</Typography>
        //     <Button onClick={handleReset}>Reset</Button>
        //   </div>
        <><Button onClick={handleReset}>Reset</Button></>
        ) : (
          <div>
            <div style={{ background: '#fff', height: '100%', overflowY: 'scroll'}}>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                PREV
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'FINISH' : 'NEXT'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}