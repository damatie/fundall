import React, { useState, useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Formsy from 'formsy-react';
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
import InfoRounded from '@material-ui/icons/InfoRounded';
import Divider from '@material-ui/core/Divider';

const Form = () => {
	const classes = inputStyles();
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	const userData = [];
	const [agree, setAgree] = useState(false);
	const [date, setDate] = useState('');

	const dispatch = useDispatch();

	const auth = useAuth;

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
								<InfoRounded />
							</span>
							NO: {'Test'}
						</h1>
					</div>
					<div className={classes.texts}>
						<p style={{ textAlign: 'center', fontSize: '20px', marginBottom: '40px' }}>
							Kindly complete this section and submit to the HR Dept at least one – week before the training program
						</p>
						<Grid container spacing="4">
							<Grid item xs="6">
								<p>Last name</p>
								<TextFieldFormsy
									className="mb-16 w-full"
									type="text"
									name="name"
									Placeholder="Last name"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs="6">
							<p>Birth date</p>
							<TextFieldFormsy
								className="mb-16 w-full"
								type="text"
								name="name"
								// Placeholder="First name"
								variant="outlined"
							/>
							</Grid>
						</Grid>
						<Grid container spacing="4">
							<Grid item xs="6">
								<p>Last name</p>
								<TextFieldFormsy
									className="mb-16 w-full"
									type="text"
									name="name"
									Placeholder="Last name"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs="6">
							<p>Birth date</p>
							<TextFieldFormsy
								className="mb-16 w-full"
								type="text"
								name="name"
								// Placeholder="First name"
								variant="outlined"
							/>
							</Grid>
						</Grid>
						<Divider className="mt-32" />
						
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

export default Form;
