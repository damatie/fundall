import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import { CircularProgress } from '@material-ui/core';
import ProgressBtn from 'app/shared/progressBtn';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { DateTimePicker } from '@material-ui/pickers';
import * as Actions from './store/actions';``

export default function AddDisciplinaryActionModal() {
	const dispatch = useDispatch();
	const loading = useSelector(({ disciplinaryAction }) => disciplinaryAction.disciplinaryAction.loading);
	const success = useSelector(({ disciplinaryAction }) => disciplinaryAction.disciplinaryAction.success);
	const employees = useSelector(({ disciplinaryAction }) => disciplinaryAction.employees.employees);
	const [open, setOpen] = useState(false);
	const [accused, setAccused] = useState('');
	const [accuser, setAccuser] = useState('');
	const [start, setStart] = useState(moment(new Date(), 'MM/DD/YYYY'));
	const [isFormValid, setIsFormValid] = useState(true);
	const [filterEmployees, setFilterEmployees] = useState(
		employees
			.filter(f => {
				return f.firstName !== null || f.lastName !== null;
			})
			.sort((a, b) => {
				if (a.firstName + ' ' + a.lastName < b.firstName + ' ' + b.lastName) {
					return -1;
				}
				if (a.firstName + ' ' + a.lastName > b.firstName + ' ' + b.lastName) {
					return 1;
				}
				return 0;
			})
	);

	useEffect(() => {
		dispatch(Actions.getEmployees());
	}, [dispatch]);

	useEffect(() => {
		if (employees.length > 0) {
			setFilterEmployees(
				employees.filter(f => {
					return f.firstName !== null || f.lastName !== null;
				})
			);
		}
	}, [employees]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const formRef = useRef(null);

	const disableButton = () => {
		setIsFormValid(false);
	};

	const enableButton = () => {
		setIsFormValid(true);
	};

	const handleDateChange = date => {
		setStart(date);
	};

	const handleSubmit = model => {
		model.accusedId = accused;
		model.accuserId = accuser;
		model.date = moment(start).format('DD MMMM YYYY');
		// console.log(model);
		dispatch(Actions.createDisciplinaryCase(model));
		handleClose();
	};

	const CaptializeFirstLetter = word => {
		if (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		}
		return '';
	};

	const handleAccusedChange = name => {
		// console.log(name);
		let hodDetails = filterEmployees.find(em => {
			return em.firstName.toLowerCase() + ' ' + em.lastName.toLowerCase() === name.toLowerCase();
		});
		setAccused(hodDetails.id);
		// console.log(hodDetails);
	};

	const handleAccuserChange = name => {
		// console.log(name);
		let hodDetails = filterEmployees.find(em => {
			return em.firstName.toLowerCase() + ' ' + em.lastName.toLowerCase() === name.toLowerCase();
		});
		setAccuser(hodDetails.id);
		// console.log(hodDetails);
	};

	return (
		<div>
			<Fab
				color="secondary"
				aria-label="add"
				className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
				onClick={handleClickOpen}
			>
				<Icon>add</Icon>
			</Fab>
			<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add New Case</DialogTitle>
				<DialogContent>
					<div className="w-full">
						<Formsy
							onValidSubmit={handleSubmit}
							onValid={enableButton}
							onInvalid={disableButton}
							ref={formRef}
							className="flex flex-col justify-center w-full"
						>
							<Autocomplete
								freeSolo
								options={
									filterEmployees &&
									filterEmployees.map(
										option =>
											option && CaptializeFirstLetter(option.firstName) + ' ' + CaptializeFirstLetter(option.lastName)
									)
								}
								onChange={(ev, value) => handleAccuserChange(value)}
								renderInput={params => (
									<TextField {...params} label="Accuser" margin="normal" variant="outlined" required />
								)}
							/>

							<Autocomplete
								freeSolo
								options={
									filterEmployees &&
									filterEmployees.map(
										option =>
											option && CaptializeFirstLetter(option.firstName) + ' ' + CaptializeFirstLetter(option.lastName)
									)
								}
								onChange={(ev, value) => handleAccusedChange(value)}
								renderInput={params => (
									<TextField {...params} label="Accused" margin="normal" variant="outlined" required />
								)}
							/>

							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="caseDescription"
								label="Case Description"
								validations={{
									minLength: 1
								}}
								validationErrors={{
									minLength: 'Min character length is 1'
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												info
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								margin="normal"
								required
							/>

							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="modeOfLodging"
								label="Mode Of Lodging"
								validations={{
									minLength: 1
								}}
								validationErrors={{
									minLength: 'Min character length is 1'
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												info
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								margin="normal"
								required
							/>

							<DateTimePicker
								label="Start"
								inputVariant="outlined"
								value={start}
								margin="normal"
								onChange={date => handleDateChange(date)}
								className="mt-8 mb-16 w-full"
								minDate={start}
								format={'MMMM Do, YYYY hh:mm a'}
							/>
							<DialogActions>
								<Grid container spacing={1}>
									<Grid item xs>
										<ProgressBtn loading={loading} success={success} content="Create" disable={!isFormValid} />
									</Grid>
								</Grid>
							</DialogActions>
							<br></br>
						</Formsy>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
