import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import SelectInput from '@material-ui/core/Select/SelectInput';

const defaultFormState = {
	id: FuseUtils.generateGUID(),
	courses: '',
	start: moment(new Date(), 'MM/DD/YYYY'),
	end: moment(new Date(), 'MM/DD/YYYY')
};

function EventDialog(props) {
	const dispatch = useDispatch();
	const categories = useSelector(({ personalTraining }) => personalTraining.courses.categories);
	const courses = useSelector(({ personalTraining }) => personalTraining.courses.courses);
	const eventDialog = useSelector(({ personalTraining }) => personalTraining.events.eventDialog);
	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);
	const start = moment(form.start, 'MM/DD/YYYY');
	const end = moment(form.end, 'MM/DD/YYYY');
	const [category, setCategory] = useState('');

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (eventDialog.type === 'edit' && eventDialog.data) {
			setForm({ ...eventDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (eventDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...eventDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [eventDialog.data, eventDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (eventDialog.props.open) {
			initDialog();
			dispatch(Actions.getApprovedCourses());
		}
	}, [eventDialog.props.open, initDialog, dispatch]);

	function closeComposeDialog() {
		return eventDialog.type === 'edit'
			? dispatch(Actions.closeEditEventDialog())
			: dispatch(Actions.closeNewEventDialog());
	}

	function canBeSubmitted() {
		return form.courses != '';
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (eventDialog.type === 'new') {
			dispatch(Actions.addEvent(form));
		} else {
			dispatch(Actions.updateEvent(form));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeEvent(form.id));
		closeComposeDialog();
	}

	return (
		<Dialog {...eventDialog.props} onClose={closeComposeDialog} fullWidth maxWidth="xs" component="form">
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{eventDialog.type === 'new' ? 'Create Training Request' : 'Edit Training Request'}
					</Typography>
				</Toolbar>
			</AppBar>

			<form noValidate onSubmit={handleSubmit}>
				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
					<FormControl variant="outlined" className="mt-8 mb-16 w-full">
						<InputLabel htmlFor="outlined-age-native-simple">Courses</InputLabel>
						<Select
						value={form.courses}
						onChange={handleChange}
						label="Courses"
						inputProps={{
							name: 'courses',
							id: 'courses',
						}}
						>
							<MenuItem value="">
								Select Courses
							</MenuItem>
							{courses.sort().map(item => (
								<MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
							))}
						</Select>
					</FormControl>

					<DateTimePicker
						label="Start"
						inputVariant="outlined"
						value={start}
						onChange={date => setInForm('start', date)}
						className="mt-8 mb-16 w-full"
						maxDate={end}
					/>

					<DateTimePicker
						label="End"
						inputVariant="outlined"
						value={end}
						onChange={date => setInForm('end', date)}
						className="mt-8 mb-16 w-full"
						minDate={start}
					/>
				</DialogContent>

				{eventDialog.type === 'new' ? (
					<DialogActions className="justify-between px-8 sm:px-16">
						<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
							Add
						</Button>
					</DialogActions>
				) : (
					<DialogActions className="justify-between px-8 sm:px-16">
						<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
							Save
						</Button>
						<IconButton onClick={handleRemove} color="secondary">
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default EventDialog;
