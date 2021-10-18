import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NewEmployeeForm from './components/NewEmployeeForm';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from "app/store/withReducer";
import employeesReducer from "./store/reducers/employees.reducer";
import useEmployees from "./hooks/useEmployees";
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCompensation from './components/EmployeeCompensation';

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
		{
            title: 'Employee Basic Information',
            label: 'Fill the basic employee information for onboarding'
        },
		{
            title: 'Compensation Details',
            label: 'Configure the employee Compensation'
        }
	];
}

const EmployeeCreation = () => {
	const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector(state => state.employeeMgt);

	// const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

    const customHook = useEmployees({
          state,
          dispatch
      });

    const {
		activeStep,
        handleBack,
        handleNext
    } = customHook;
	// const handleBack = () => {
	// 	setActiveStep(prevActiveStep => prevActiveStep - 1);
	// };

	// const handleNext = () => {
	// 	setActiveStep(prevActiveStep => prevActiveStep + 1);
	// };

	const handleStepperClick = (index) => {
		console.log(index)
		if(index > activeStep){
			handleNext();
		}else{
			handleBack();
		}
	}

	const handleReset = () => {
		setActiveStep(0);
	};

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return <NewEmployeeForm customHook={customHook} goToNextStepper={handleNext} />;
			case 1:
				return <EmployeeCompensation customHook={customHook} />;
			default:
				return 'Unknown stepIndex';
		}
	}

	return (
		<PageLayout
			noSearch
			header={{
				icon: ''
			}}
			button={{
				showButton: false,
				btnComponent: false
			}}
			content={
				<div className={classes.onBoardingStepperMain}>
					<Stepper activeStep={activeStep} alternativeLabel className={` ${classes.stepperBg}`}>
						{steps.map((item, index) => (
							<Step key={index} onClick={(ev) => handleStepperClick(index)}>
								<StepLabel>
                                    <Typography variant="h5" color="initial" className='my-10'><strong>{item.title}</strong></Typography>
                                    <Typography variant="body1" color="initial" className='my-10'>{item.label}</Typography>
                                </StepLabel>
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
							{/* {activeStep === 0 ? null : (
								<div className={` ${classes.navigation} ${classes.commonWidth}`}>
									<Button disabled={activeStep === 0} onClick={handleBack} className={` ${classes.backButton}`}>
										Back
									</Button>
									<Button variant="contained" color="primary" className={` ${classes.nextButton}`} onClick={handleNext}>
										{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</div>
							)} */}
						</>
					)}
				</div>
			}
		/>
	);
};
withReducer('employeeMgt', employeesReducer)(EmployeeCreation);
export default EmployeeCreation;
