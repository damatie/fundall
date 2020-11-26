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
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from './store/actions';
import SelectInput from '@material-ui/core/Select/SelectInput';
import clsx from 'clsx';
import Moment from 'react-moment';

const defaultFormState = {
	id: '',
	course: {},
	courseId: '',
	color: '',
	start: moment(new Date(), 'MM/DD/YYYY'),
	end: moment(new Date(), 'MM/DD/YYYY')
};

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	}
});

function EventDialog(props) {
	const dispatch = useDispatch();
	const categories = useSelector(({ personalTraining }) => personalTraining?.courses.categories);
	const courses = useSelector(({ personalTraining }) => personalTraining?.courses.courses);
	const eventDialog = useSelector(({ personalTraining }) => personalTraining?.events.eventDialog);
	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);
	const [start, setStart ] = useState(moment(new Date(), 'MM/DD/YYYY'));
	const [end, setEnd] = useState(moment(new Date(), 'MM/DD/YYYY'));
  const classes = useStyles();
	const [courseId, setCourseId] = useState(0);
	const [edit, setEdit] = useState(false);
	const [color, setColor] = useState('');
	const [course, setCourse] = useState({});
	const [title, setTitle] = useState('');
	const [id, setId] = useState(0);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (eventDialog.type === 'edit' && eventDialog.data) {
			console.log(eventDialog.data);
			setCourseId(eventDialog.data.course.id);
			setColor(eventDialog.data.color);
			setStart(moment(eventDialog.data.start, 'MM/DD/YYYY'));
			setEnd(moment(eventDialog.data.end, 'MM/DD/YYYY'));
			setCourse(eventDialog.data.course);
			setTitle(eventDialog.data.title);
			setId(eventDialog.data.id);
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
	}, [eventDialog?.data, eventDialog.type, setForm]);

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
		return courseId != '';
	}

	function handleSubmit(event) {
		event.preventDefault();
		const payload = {
			trainingCourseId: courseId,
			departmentHead:7,
			hrManager:4,
			startDate: moment(start).format("DD-MM-YYYY"),
			endDate: moment(end).format("DD-MM-YYYY")
		}
		console.log(payload);
		console.log(id);
		dispatch(Actions.updateTraining(payload, id));
		closeComposeDialog();
	}

	function handleRemove() {
		console.log(id);
		dispatch(Actions.deleteTrainingRequest(id))
		closeComposeDialog();
	}

	function handleShowEdit(){
		setEdit(true);
	}

	return (
		<Dialog {...eventDialog.props} onClose={closeComposeDialog} fullWidth maxWidth="xs" component="form">
				<AppBar position="static" style={{backgroundColor: color, color: 'white'}}>
					<Toolbar className="flex w-full">
						<Typography variant="subtitle1" color="inherit">
							{(!edit) ? title : 'Edit Training Request'}
						</Typography>
					</Toolbar>
				</AppBar>

			{
				(edit) ? (
				<form noValidate onSubmit={handleSubmit}>
					<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
						<FormControl variant="outlined" className="mt-8 mb-16 w-full">
							<InputLabel htmlFor="outlined-age-native-simple">Courses</InputLabel>
							<Select
							value={courseId}
							onChange={ev => setCourseId(ev.target.value)}
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
									<MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
								))}
							</Select>
						</FormControl>

						<DateTimePicker
							label="Start"
							inputVariant="outlined"
							value={start}
							onChange={date => setStart(date)}
							className="mt-8 mb-16 w-full"
							maxDate={end}
						/>

						<DateTimePicker
							label="End"
							inputVariant="outlined"
							value={end}
							onChange={date => setEnd(date)}
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
							<div>
							<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
								Save
							</Button>
							&nbsp;
							<Button variant="contained" color="secondary" type="button" onClick={ev => {setEdit(false);}}>
								View
							</Button>
							</div>
							<IconButton onClick={handleRemove} color="secondary">
								<Icon>delete</Icon>
							</IconButton>
						</DialogActions>
					)}
				</form> )
					: (
					<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
						<table className={clsx(classes.table, 'w-full text-justify')}>
							<tbody>
								<tr className="cost">
									<th>Cost</th>
									<td>{course.cost}</td>
								</tr>

								<tr className="location">
									<th>Location</th>
									<td>{course.location}</td>
								</tr>

								<tr className="cert">
									<th>Certification</th>
									<td>{(course.certification) ? "Yes" : "No"}</td>
								</tr>

								<tr className="catergory">
									<th>Category</th>
									<td>{course.category}</td>
								</tr>

								<tr className="dept">
									<th>Department</th>
									<td>{course.department}</td>
								</tr>

								<tr className="deptHead">
									<th>Department Head</th>
									<td>{course.departmentHeadId}</td>
								</tr>

								<tr className="hrManager">
									<th>HR Manager</th>
									<td>{course.hrManager}</td>
								</tr>
								<tr className="created">
									<th>Created</th>
									<td><Moment format="ddd Do MMM, YYYY | hh:mm:ss a">{course.createdAt}</Moment></td>
								</tr>
								<tr className="updated">
									<th>Updated</th>
									<td><Moment format="ddd Do MMM, YYYY | hh:mm:ss a">{course.updatedAt}</Moment></td>
								</tr>
							</tbody>
						</table>
					<DialogActions className="justify-between px-8 sm:px-16">
						<Button variant="contained" color="primary" onClick={handleShowEdit} type="button">
							Edit
						</Button>
					</DialogActions>
					</DialogContent>
					)
			}
		</Dialog>
	);
}

export default EventDialog;
