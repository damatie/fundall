import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EmployeeInformation from './components/EmployeeInformation';
import SpouseAndDependant from './components/SpouseAndDependant';
import NextOfKin from './components/NextOfKin';
import EmergencyContact from './components/EmergencyContact';
import EducationQualification from './components/EducationQualification';

const useStyles = makeStyles(theme => ({
	// onBoardingStepperMain: {
	// 	backgroundColor: '#ffffff'
	// },
	stepperBg: {
		backgroundColor: 'transparent'
	}
}));

function getSteps() {
	return [
		'Employee Information',
		'Spouse and Dependant',
		'Next of Kin',
		'Emergency Contact',
		'Education Qualification'
	];
}

function getStepContent(stepIndex) {
	switch (stepIndex) {
		case 0:
			return (
				<>
					<EmployeeInformation />
				</>
			);
		case 1:
			return (
				<>
					<SpouseAndDependant />
				</>
			);
		case 2:
			return (
				<>
					<NextOfKin />
				</>
			);
		case 3:
			return (
				<>
					<EmergencyContact />
				</>
			);
		case 4:
			return (
				<>
					<EducationQualification />
				</>
			);
		default:
			return 'Unknown stepIndex';
	}
}

const OnboardingStepperMain = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className={classes.onBoardingStepperMain}>
			<Stepper activeStep={activeStep} alternativeLabel className={` ${classes.stepperBg}`}>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>All steps completed</Typography>
						<Button onClick={handleReset}>Reset</Button>
					</div>
				) : (
					<div>
						<div className={classes.instructions}>{getStepContent(activeStep)}</div>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
								Back
							</Button>
							<Button variant="contained" color="primary" onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default OnboardingStepperMain;
