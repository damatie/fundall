import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function ResetPasswordPage() {
	const classes = useStyles();
	const { id } = useParams();
	const history = useHistory();

	const { form, handleChange, resetForm } = useForm({
		name: '',
		email: '',
		password: '',
		passwordConfirm: ''
	});
	const [loading, setLoading] = useState(false)

	function isFormValid() {
		return (
			form.email.length > 0 &&
			form.password.length > 0 &&
			form.password.length > 3 &&
			form.password === form.passwordConfirm
		);
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		setLoading(true);
		fetch(`https://hris-cbit.herokuapp.com/api/v1/auth/employee/reset_password/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form)
		})
			.then((res) => res.json())
			.then(res => {
				setLoading(false);
				if (res.success === true){
					Swal.fire({
						title: 'Reset password',
						text: res.message,
						icon: 'success',
						timer: 3000,
					});
					history.push({
						pathname: '/auth/login'
					})
				} else {
					Swal.fire({
						title: 'Reset password',
						text: res.message,
						icon: 'error',
						timer: 3000,
					});
				}
			})
		resetForm();
	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							<img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" />

							<Typography variant="h6" className="mt-16 mb-32">
								RESET YOUR PASSWORD
							</Typography>

							<form
								name="resetForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>
								<TextField
									className="mb-16"
									label="Password"
									autoFocus
									type="password"
									name="password"
									value={form.email}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>

								<TextField
									className="mb-16"
									label="confirm password"
									type="password"
									name="passwordConfirm"
									value={form.password}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>

								<TextField
									className="mb-16"
									label="Password (Confirm)"
									type="password"
									name="passwordConfirm"
									value={form.passwordConfirm}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>

								<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16"
									aria-label="Reset"
									disabled={!isFormValid()}
									type="submit"
								>
									RESET MY PASSWORD
								</Button>
							</form>

							<div className="flex flex-col items-center justify-center pt-32 pb-24">
								<Link className="font-medium" to="/auth/login">
									Go back to login
								</Link>
							</div>
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default ResetPasswordPage;