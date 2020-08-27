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
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { DateTimePicker } from '@material-ui/pickers';
import * as Actions from './store/actions';
import TakeAction from './TakeAction';
import { yellow, red } from '@material-ui/core/colors';


const CaptializeFirstLetter = word => {
	if (word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
	return '';
};
export default function EditDisciplinaryCaseModal(props) {
	const dispatch = useDispatch();
	const selected = props.selectedItem;
	const loading = useSelector(({ disciplinaryCase }) => disciplinaryCase.disciplinaryCase.loading);
	const success = useSelector(({ disciplinaryCase }) => disciplinaryCase.disciplinaryCase.success);
	const employees = useSelector(({ disciplinaryCase }) => disciplinaryCase.employees.employees);
	const actions = useSelector(({ disciplinaryCase }) => disciplinaryCase.disciplinaryAction.data);
	const [open, setOpen] = useState(false);
	const [accused, setAccused] = useState('');
	const [accuser, setAccuser] = useState('');
	const [value, setValue] = React.useState('female');
	const [start, setStart] = useState(moment(new Date(), 'MM/DD/YYYY'));
	const [isFormValid, setIsFormValid] = useState(true);
	const [edit, setEdit] = useState(false);
	const [form, setForm] = useState({
		accusedId: 0,
		accuserId: 0,
		date: moment(new Date(), 'MM/DD/YYYY'),
		caseDescription: '',
		caseNo: '',
		modeOfLodging: 'selected.modeOfLodging'
	});
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
		dispatch(Actions.getDisciplinaryAction());
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

	useEffect(() => {
		setForm({
			accusedId: selected.accusedId,
			accuserId: selected.accuserId,
			date: selected.date,
			caseNo: selected.caseNo,
			caseDescription: selected.caseDescription,
			modeOfLodging: selected.modeOfLodging
		});
	}, [selected])

	const DeleteButton = withStyles((theme) => ({
		root: {
		  color: theme.palette.getContrastText(red[500]),
		  backgroundColor: red[500],
		  '&:hover': {
			backgroundColor: red[700],
		  },
		},
	  }))(Button)

	const ActionButton = withStyles((theme) => ({
		root: {
			color: 'white',
			backgroundColor: yellow[700],
			'&:hover': {
			backgroundColor: yellow[900],
			},
		},
	}))(Button)

	const handleClickOpen = () => {
		props.handleClose();
		setOpen(true);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
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
		form.date = moment(date).format('DD MMMM YYYY');
		setForm(form);
	};

	const handleSubmit = (id) => {
		console.log(form);
		console.log(id);
		dispatch(Actions.updateDisciplinaryCase(form, id));
		props.handleClose();
	};

	const handleDelete = (id) => {
		dispatch(Actions.deleteDisciplinaryCase(id));
		props.handleClose();
	}

	const handleAccusedChange = name => {
		console.log(name);
		let hodDetails = filterEmployees.find(em => {
			return em.firstName.toLowerCase() + ' ' + em.lastName.toLowerCase() === name.toLowerCase();
		});
		setAccused(hodDetails.id);
		form.accusedId = hodDetails.id
		setForm(form);
		console.log(hodDetails);
	};

	const handleAccuserChange = name => {
		console.log(name);
		let hodDetails = filterEmployees.find(em => {
			return em.firstName.toLowerCase() + ' ' + em.lastName.toLowerCase() === name.toLowerCase();
		});
		setAccuser(hodDetails.id);
		form.accuserId = hodDetails.id
		setForm(form);
		console.log(hodDetails);
	};

	function handleShowEdit(){
		setEdit(true);
	}

	return (
		<div>
			<Dialog open={props.open} onClose={props.handleClose} fullWidth={true} maxWidth={'md'} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit Disciplinary Case</DialogTitle>
				<DialogContent>
					<div className="w-full">
					<form noValidate>
						<Grid container spacing={4}>
							<Grid item xs={12} md={6} lg={6} lx={6}>
								<Autocomplete
									freeSolo
									disabled={!edit}
									value={selected.accuserName}
									options={
										filterEmployees &&
										filterEmployees.map(
											option =>
												option && CaptializeFirstLetter(option.firstName) + ' ' + CaptializeFirstLetter(option.lastName)
										)
									}
									onChange={(ev, value) => handleAccuserChange(value)}
									renderInput={params => (
										<TextField {...params} disabled={!edit} value={selected.accuserName} label="Accuser" margin="normal" variant="outlined" required />
									)}
								/>
							</Grid>
							<Grid item xs={12} md={6} lg={6} lx={6}>
								<Autocomplete
									freeSolo
									disabled={!edit}
									value={selected.accusedName}
									options={
										filterEmployees &&
										filterEmployees.map(
											option =>
												option && CaptializeFirstLetter(option.firstName) + ' ' + CaptializeFirstLetter(option.lastName)
										)
									}
									onChange={(ev, value) => handleAccusedChange(value)}
									renderInput={params => (
										<TextField {...params} disabled={!edit} value={selected.accusedName} label="Accused" margin="normal" variant="outlined" required />
									)}
								/>
							</Grid>
						</Grid>
						
						<Grid container spacing={4}>
							<Grid item xs={12} md={6} lg={6} lx={6}>
								<TextField
									className="mb-16 w-full"
									type="text"
									name="caseDescription"
									value={selected.caseDescription}
									onChange={ev => {form.caseDescription = (ev.target.value) ? ev.target.value : selected.caseDescription; setForm(form)}}
									label="Case Description"
									disabled={!edit}
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
							</Grid>
							<Grid item xs={12} md={6} lg={6} lx={6}>
								<TextField
									className="mb-16 w-full"
									type="text"
									name="modeOfLodging"
									label="Mode Of Lodging"
									value={selected.modeOfLodging}
									disabled={!edit}
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
							</Grid>
						</Grid>
						
						<DateTimePicker
							label="Start"
							inputVariant="outlined"
							value={moment(selected.date, 'DD MMMM YYYY')}
							margin="normal"
							disabled={!edit}
							onChange={date => handleDateChange(date)}
							className="mt-8 mb-16 w-full"
							minDate={moment(selected.date, 'DD MMMM YYYY')}
							format={'MMMM Do, YYYY hh:mm a'}
						/>
						{(edit) ?
						<DialogActions>
							<Grid container spacing={4} style={{float:'right'}}>
								<Grid item xs={12} md={2} lg={2} lx={2}>
									<Button variant="contained" className="w-full" color="secondary" type="button" onClick={props.handleClose}>Cancel</Button>
								</Grid>
								<Grid item xs={12} md={4} lg={4} lx={4}>
									<ActionButton variant="contained" className="w-full" color="primary" onClick={handleClickOpen}>Take Disciplinary Action</ActionButton>
								</Grid>
								<Grid item xs={12} md={3} lg={3} lx={3}>
									<DeleteButton variant="contained" className="w-full" color="primary" onClick={ev => {handleDelete(selected.id)}}>
										Remove Case
									</DeleteButton>
								</Grid>
								
								<Grid item xs={12} md={2} lg={2} lx={2}>
									<Button variant="contained" className="w-full" color="primary" type="button"  onClick={ev => {setEdit(false); handleSubmit(selected.id)}}>Save</Button>
								</Grid>
							</Grid>
						</DialogActions>
						:
						<DialogActions>
							<Grid container spacing={4} style={{float:'right'}}>
								<Grid item xs={12} md={2} lg={2} lx={2}>
									<Button variant="contained" className="w-full" color="secondary" type="button" onClick={props.handleClose}>Cancel</Button>
								</Grid>
								<Grid item  xs={12} md={4} lg={4} lx={4}>
									<ActionButton variant="contained" className="w-full" color="primary" onClick={handleClickOpen}>Take Disciplinary Action</ActionButton>
								</Grid>
								<Grid item xs={12} md={3} lg={3} lx={3}>
									<DeleteButton variant="contained" className="w-full" color="primary" onClick={ev => {handleDelete(selected.id)}}>
										Remove Case
									</DeleteButton>
								</Grid>
								
								<Grid item xs={12} md={2} lg={2} lx={2}>
								<Button variant="contained" className="w-full" color="primary" type="button" onClick={handleShowEdit} >Edit</Button>
								</Grid>
							</Grid>
						</DialogActions>
						}
						<br></br>
					</form>
					</div>
				</DialogContent>
			</Dialog>

			{/* Modal to handle list of Action from the Database */}
			<TakeAction handleClose={handleClose} open={open} selectedItem={selected}/>
		</div>
	);
}
