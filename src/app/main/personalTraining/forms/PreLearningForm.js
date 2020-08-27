import React, { useState, useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Formsy from 'formsy-react';
import withReducer from 'app/store/withReducer';
import { TextFieldFormsy, CheckboxFormsy, RadioGroupFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from 'app/shared/EmployeeFormInput';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';
import * as Actions from '../store/actions';
import LocalAtmRoundedIcon from '@material-ui/icons/SchoolRounded';
import Divider from '@material-ui/core/Divider';
import reducer from '../store/reducers';

const PreLearningForm = () => {
	const classes = inputStyles();
	const questions = useSelector(({ preLearningForm }) => preLearningForm.checkListForm.data);
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	const userData = [];
	const [agree, setAgree] = useState(false);
	const [date, setDate] = useState('');

	const dispatch = useDispatch();

	const auth = useAuth;

	useEffect(() => {
		dispatch(Actions.getAllQuestions());
	}, [dispatch]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		// const request = axios.patch('https://hris-cbit.herokuapp.com/api/v1/onboarding/sign-form', {
		//   authorizationForPayrollDeductions: true
		// }, {
		//   headers: {
		//     Authorization: `JWT ${auth().getToken}`
		//   }
		// });
		// request.then(res => {
		swal.fire({
			title: 'Form submisson',
			text: 'Form submitted',
			icon: 'success',
			timer: 3000
		});

		// }).catch(e => console.error(e));
	}

	return (
		<Formsy
			onValidSubmit={handleSubmit}
			onValid={enableButton}
			onInvalid={disableButton}
			ref={formRef}
			className="flex flex-col justify-center"
		>
			<div className={classes.formField}>
				<div className={classes.container}>
					<div className={classes.title}>
						<h1>
							<span className={classes.AuthIcon}>
								<LocalAtmRoundedIcon />
							</span>
							Pre-Training Checklist
						</h1>
					</div>
					<div className={classes.texts}>
						<p style={{ textAlign: 'center', fontSize: '20px', marginBottom: '40px' }}>
							Kindly complete this section and submit to the HR Dept at least one – week before the training program
						</p>
						{(questions) ? questions.map(data => {
							return (
							<Grid container spacing="4">
								<Grid item xs="12">
									<p>{data.question}</p>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name={data.id}
										id={data.id}
										variant="outlined"
									/>
								</Grid>
							</Grid>
							);
						}): (<Grid></Grid>)}
						<Divider className="mt-32" />
						<Grid item className="mt-32" xs="12" md="12" lg="12" xl="12">
							<Grid container item xs="5" md="5" lg="5" xl="5" style={{ float: 'left' }}>
								<Grid container item sm="5" md="5" lg="5" xl="5">
									<p>Course delegate signature: </p>
								</Grid>
								<Grid container item sm="7" md="7" lg="7" xl="7">
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="name"
										// label="Employee name"
										validations={{
											minLength: 10
										}}
										validationErrors={{
											minLength: 'Min character length is 10'
										}}
										required
									/>
								</Grid>
							</Grid>
							<Grid container item xs="5" md="5" lg="5" xl="5" style={{ float: 'right' }}>
								<Grid container item sm="5" md="5" lg="5" xl="5">
									<p>Manager Signature: </p>
								</Grid>
								<Grid container item sm="7" md="7" lg="7" xl="7">
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="name"
										// label="Employee name"
										validations={{
											minLength: 4
										}}
										validationErrors={{
											minLength: 'Min character length is 4'
										}}
										required
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item className="mt-32 mb-32" xs="12" md="12" lg="12" xl="12">
							<Grid container item xs="5" md="5" lg="5" xl="5" style={{ float: 'left' }}>
								<Grid container item sm="5" md="5" lg="5" xl="5">
									<p>Name: </p>
								</Grid>
								<Grid container item sm="7" md="7" lg="7" xl="7">
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="name"
										// label="Employee name"
										validations={{
											minLength: 10
										}}
										validationErrors={{
											minLength: 'Min character length is 10'
										}}
										required
									/>
								</Grid>
							</Grid>
							<Grid container item xs="5" md="5" lg="5" xl="5" style={{ float: 'right' }}>
								<Grid container item sm="5" md="5" lg="5" xl="5">
									<p>Name: </p>
								</Grid>
								<Grid container item sm="7" md="7" lg="7" xl="7">
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="name"
										// label="Employee name"
										validations={{
											minLength: 4
										}}
										validationErrors={{
											minLength: 'Min character length is 4'
										}}
										required
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid alignItems="center" container item sm="12" md="12" lg="12" xl="12">
							<div className={classes.submit}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									className="mx-auto mt-32 mb-80 w-6/12"
									aria-label="submit"
									// disabled={!isFormValid}
								>
									Submit
								</Button>
							</div>
						</Grid>
					</div>
				</div>
			</div>
		</Formsy>
	);
};

export default withReducer('preLearningForm', reducer)(PreLearningForm);;
