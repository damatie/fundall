import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountSettings from './accountsettings';
import OrganizationInformation from './orginfo';
import Entities from './entities';
import Departments from './departments';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5rem',
    width: '100%',
    background: '#fff',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps(hasEntities) {
  if (hasEntities) {
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
        title: 'Entities', 
        details: 'Configure entities in your organization'
      },
      {
        id: 4,
        title: 'Departments', 
        details: 'Configure departments in your organization'
      }
    ];  
  } else {
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
          title: 'Departments', 
          details: 'Configure departments in your organization'
        }
      ];
  }
}

function getStepContent(stepIndex, handleNext, handleBack, hasEntities) {
  if (hasEntities) {
    switch (stepIndex) {
      case 0:
        return <><AccountSettings handleNext={handleNext} handleBack={handleBack}/></>;
      case 1:
        return <><OrganizationInformation handleNext={handleNext} handleBack={handleBack}/></>;
      case 2:
        return <><Entities handleNext={handleNext} handleBack={handleBack}/></>;
      case 3:
        return <><Departments handleNext={handleNext} handleBack={handleBack}/></>
      default:
        return <></>;
    }
  } else {
    switch (stepIndex) {
      case 0:
        return <><AccountSettings handleNext={handleNext} handleBack={handleBack}/></>;
      case 1:
        return <><OrganizationInformation handleNext={handleNext} handleBack={handleBack}/></>;
      case 2:
        return <><Departments handleNext={handleNext} handleBack={handleBack}/></>
      default:
        return <></>;
    }
  }
}

function StepperMain() {
  const classes = useStyles();
  const [hasEntities, setHasEntities] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps(true);
  const steps2 = getSteps(false);

  React.useEffect(() => {
    const dataResponse = localStorage.getItem('login_data');
  	const data = JSON.parse(dataResponse);
	  console.log('Stepper User Login Data: ', data);
		if (data?.company?.hasEntities === false) {
      setHasEntities(false);
    }
    setActiveStep(data?.company?.regStep || 0)
	}, []);

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
        {hasEntities ? steps.map((label) => (
          <Step key={label.id}>
            <StepLabel>
              <span><strong>{label.title}</strong></span>
              <span><Typography variant="body2" color="initial" className='my-5'>{label.details}</Typography></span>
            </StepLabel>
          </Step>
        )) : steps2.map((label) => (
          <Step key={label.id}>
            <StepLabel>
              <span><strong>{label.title}</strong></span>
              <span><Typography variant="body2" color="initial" className='my-5'>{label.details}</Typography></span>
            </StepLabel>
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
              <Typography className={classes.instructions}>{getStepContent(activeStep, handleNext, handleBack, hasEntities)}</Typography>
            </div>
            {/* <div>
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
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default StepperMain;