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
import PageLayout from 'app/shared/pageLayout/PageLayout';

const useStyles = makeStyles(theme => ({
	onBoardingStepperMain: {
		backgroundColor: '#ffffff',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	stepperBg: {
		backgroundColor: 'transparent'
	},
	commonWidth: {
		width: '90%',
		margin: 'auto'
	},
	instructions: {
		marginTop: '0%'
	},
	navigation: {
		marginBottom: '3%'
	},
	backButton: {
		backgroundColor: '#EBEBEB',
		color: '#000000',

		'&:hover': {
			backgroundColor: '#252C67',
			color: '#ffffff'
		}
	},
	nextButton: {
		backgroundColor: '#00CCF2',
		color: '#000000',
		marginLeft: '5%',

		'&:hover': {
			color: '#ffffff'
		}
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

const OnboardingStepperMain = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return <EmployeeInformation goToNextStepper={handleNext} />;
			case 1:
				return <SpouseAndDependant />;
			case 2:
				return <NextOfKin />;
			case 3:
				return <EmergencyContact />;
			case 4:
				return <EducationQualification />;
			default:
				return 'Unknown stepIndex';
		}
	}

	return (
		<PageLayout
			noSearch
			header={{
				icon: ''
				// title: 'Quarterly Review',
				// handleSearch: ({ target: { value } }) => console.log(value)
			}}
			// prev={{
			// 	url: prevUrl
			// }}
			button={{
				showButton: false,
				btnComponent: false
			}}
			content={
				<div className={classes.onBoardingStepperMain}>
					<Stepper activeStep={activeStep} alternativeLabel className={` ${classes.stepperBg}`}>
						{steps.map(label => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<>
							<Typography className={` ${classes.instructions} ${classes.commonWidth}`}>All steps completed</Typography>
							<Button onClick={handleReset}>Reset</Button>
						</>
					) : (
						<>
							<div className={` ${classes.instructions} ${classes.commonWidth}`}>{getStepContent(activeStep)}</div>
							{activeStep === 0 ? null : (
								<div className={` ${classes.navigation} ${classes.commonWidth}`}>
									<Button disabled={activeStep === 0} onClick={handleBack} className={` ${classes.backButton}`}>
										Back
									</Button>
									<Button variant="contained" color="primary" className={` ${classes.nextButton}`} onClick={handleNext}>
										{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			}
		/>
	);
};

export default OnboardingStepperMain;
