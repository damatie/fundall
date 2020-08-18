import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import swal from 'sweetalert2';
import Axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import MenuItem from '@material-ui/core/MenuItem';
import ProgressBtn from 'app/shared/progressBtn';
import { useState } from 'react';
import { getBaseUrl } from 'app/shared/getBaseUrl';

const defaultFormState = {
	// id: FuseUtils.generateGUID(),
	leaveType: '',
	leaveFor: '',
	fromDate: moment(new Date(), 'MM/DD/YYYY'),
	toDate: moment(new Date(), 'MM/DD/YYYY'),
	lineManagerId: '',
	backUpEmployee: '',
	allowance: false,
	reason: ''
};

// moment(new Date(), 'MM/DD/YYYY')

function EventDialog(props) {
	const dispatch = useDispatch();
	const eventDialog = useSelector(({ calendarApp }) => calendarApp.events.eventDialog);
	const leaveRequest = useSelector(({ calendarApp }) => calendarApp.leaveRequest)
	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);
	const start = moment(form.fromDate, 'MM/DD/YYYY');
	const end = moment(form.toDate, 'MM/DD/YYYY');
	const auth = useAuth
	const [leaveType, setLeaveType] = useState([]);
	const [ isTrue, setIsTrue ] = useState(true);
	const [days, setDays] = useState(0);

	useEffect(() => {
		Axios.get(`${getBaseUrl()}/leave-type/`, {
			headers: { Authorization: `JWT ${auth().getToken}` }
		}).then(data => {
			setLeaveType(data.data.data);
		}).catch(e => console.error(e))
	}, []);

	useEffect(() => {
		const fromDate = new Date(form.fromDate);
		const toDate = new Date(form.toDate);
		const diffInTime = toDate.getTime() - fromDate.getTime();
		const diffInDays = diffInTime / (1000 * 3600 * 24);
		setDays(diffInDays);
		if(diffInDays >= 14) {
			setIsTrue(false);
		} else {
			setIsTrue(true);
		}
	}, [form])

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
		}
	}, [eventDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return eventDialog.type === 'edit'
			? dispatch(Actions.closeEditEventDialog())
			: dispatch(Actions.closeNewEventDialog());
	}

	function canBeSubmitted() {
		// return form.leaveType.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		// console.log({
		// 	...form,
		// 	days: days
		// })

		// if (eventDialog.type === 'new') {
		// 	dispatch(Actions.addEvent(form));
		// } else {
		// 	dispatch(Actions.updateEvent(form));
		// }
		dispatch(Actions.requestLeave({
			...form,
			days: days,
			allotedYear: new Date().getFullYear()
		}));
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
						{eventDialog.type === 'new' ? 'New Leave Request' : 'Edit Event'}
					</Typography>
				</Toolbar>
			</AppBar>

			<form noValidate onSubmit={handleSubmit}>
				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>

					<TextField
						id="title"
						label="Leave type"
						select
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						name="leaveType"
						defaultValue={form.leaveType}
						onChange={handleChange}
						variant="outlined"
						autoFocus
						required
						fullWidth
					>
						{leaveType.map(item => (
						<MenuItem value={item.type}>
							{item.type}
						</MenuItem>))}
					</TextField>

					<TextField
						id="title"
						label="Leave for"
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						name="leaveFor"
						defaultValue={form.leaveFor}
						onChange={handleChange}
						variant="outlined"
						autoFocus
						required
						fullWidth
					/>

					<DatePicker
						label="From date"
						inputVariant="outlined"
						value={start}
						onChange={date => setInForm('fromDate', date)}
						className="mt-8 mb-16 w-full"
						maxDate={end}
					/>

					<DatePicker
						label="To date"
						inputVariant="outlined"
						value={end}
						onChange={date => setInForm('toDate', date)}
						className="mt-8 mb-16 w-full"
						minDate={start}
					/>

					<TextField
						id="title"
						label="Line manager"
						select
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						name="lineManagerId"
						defaultValue={form.leaveType}
						onChange={ e => {
							handleChange(e)
						}}
						variant="outlined"
						autoFocus
						required
						fullWidth
					>
						{[{name: 'David Chinweike', id: 10}].map(item => (
						<MenuItem value={item.id}>
							{item.name}
						</MenuItem>))}
					</TextField>

					<TextField
						id="title"
						label="Backup employee"
						select
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						name="backUpEmployee"
						defaultValue={form.leaveType}
						onChange={handleChange}
						variant="outlined"
						autoFocus
						required
						fullWidth
					>
						{[{name: 'Matthew Nate', id: 7}].map(item => (
						<MenuItem value={item.id}>
							{item.name}
						</MenuItem>))}
					</TextField>
					
					<FormControlLabel
						className="mt-8 mb-16"
						label="Apply for leave allowance"
						control={<Switch disabled={isTrue}  id="allDay" name="allowance" onChange={handleChange} />}
					/>

					<TextField
						className="mt-8 mb-16"
						id="desc"
						label="Leave reasons"
						type="text"
						name="reason"
						defaultValue={form.desc}
						onChange={handleChange}
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>


				</DialogContent>

				{eventDialog.type === 'new' ? (
					<DialogActions className="justify-between px-8 sm:px-16 w-full">
						{/* <Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
							Add
						</Button> */}
						<ProgressBtn succcess={leaveRequest.success} loading={leaveRequest.loading} content='Request leave' disabled={!canBeSubmitted()} />
					</DialogActions>
				) : (
					<DialogActions className="justify-between px-8 sm:px-16">
						<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
							Save
						</Button>
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default EventDialog;
