import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { amber, blue, blueGrey, green } from '@material-ui/core/colors';
import Moment from 'react-moment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useAuth } from 'app/hooks/useAuth';
import { authRoles } from 'app/auth';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import CardWidget from 'app/shared/widgets/CardWidget';
import PersonalTrainingCalendar from '../personalTrainingCalendar';

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	},
	pagination: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '32px',
		marginTop: '30px'
	},
	previousBtn: {
		marginBottom: 10,
		alignSelf: 'left',
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
		color: 'white',
		fontSize: 20
	},
}));

function PersonalTrainingDashboard(props) {
	const dispatch = useDispatch();
	// const courses = useSelector(({ academyApp }) => academyApp.courses.courses);
	// const categories = useSelector(({ academyApp }) => academyApp.courses.categories);
	// const employees = useSelector(({ academyApp }) => academyApp.employees.employees);
	// const totalNo = useSelector(({ academyApp }) => academyApp.courses.totalNo);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const trainings = useSelector(({ personalTraining }) => personalTraining.trainings.trainings);

	const classes = useStyles(props);
	const theme = useTheme();
	// const [data, setData] = useState(courses);
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState('all');
	const [search, setSearch] = useState('');
	const [start, setStart] = useState(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
	const [end, setEnd] = useState(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
	const [duration, setDuration] = useState('');
	const [id, setId] = useState('');
	const [hod, setHod] = useState(0);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(9);
	const userData = useAuth().getUserData;
	const employeeHOD = useAuth().getUserDetails.department.departmentHeadId;


	function handleSearch(event) {
		setSearch(event.target.value);
	}

	function handleFilter(event) {
		setFilter(event.target.value);
	}

	function canBeSubmitted() {
		if (checkRole()) {
			return (start !== '' && hod !== 0);
		} else {
			return start !== '';
		}
	}

	const handleChangePage = (event, value) => {
		console.log(value);
		let newPage = value - 1;
		dispatch(Actions.getApprovedCourses(rowsPerPage, newPage * rowsPerPage));
		setPage(value);
		window.scrollTo(0, 0);
		// alert('hello')
	};

	//Check if the logged in user has management role
	function checkRole() {
		return (authRoles.managers.includes(userData.role));
	}

	function handleSubmit(event) {
		event.preventDefault();
		// console.log(duration);
		//let Trim the duration value to remove white space
		let durations = duration.trim();
		//let Split the duration to get first part of the array as the number and convert it to interger
		let number = parseInt(durations.split(' ')[0]);
		//let split the duration and get the second part of the array.
		let months = durations.split(' ')[1].toLowerCase().includes('s')
			? durations.split(' ')[1].toLowerCase()
			: durations.split(' ')[1].toLowerCase() + 's';

		//constructing our training request payload
		const payload = {
			trainingCourseId: id,
			departmentHead: hod === 0 ? (employeeHOD != null ? employeeHOD : 13) : hod,
			hrManager: 4,
			startDate: start.format('DD-MM-YYYY'),
			endDate: end.add(number, months).format('DD-MM-YYYY')
		};
		console.log(payload);
		dispatch(Actions.createTraining(payload));
		setOpen(false);
	}

	function handleDateChange(date) {
		setStart(date);
		setEnd(date);
	}

	const goToPreviousRoute = () => {
		window.location = '/training/personal';
	}

	function handleClose() {
		setOpen(false);
	}

	function handleOpen() {
		setOpen(true);
	}

	const CaptializeFirstLetter = (word) => {
		if (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		}
		return '';
	}

	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-col flex-auto flex-shrink-0 w-full">
				<div
					className={clsx(
						classes.header,
						'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-100 sm:h-188'
					)}
				>
					<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
						<Typography color="inherit" className="text-24 sm:text-40 font-light">
							EMPLOYEE TRAINING DASHBOARD
						</Typography>
					</FuseAnimate>
					<Icon className={classes.headerIcon}> school </Icon>
				</div>
				<div className={classes.header}>
					<IconButton className={classes.previousBtn} aria-label="go back" component="span" onClick={goToPreviousRoute}>
						<ArrowBackIcon />
					</IconButton>
				</div>
				<div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
					<div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-center py-24">
						<TextField
							// label="Search"
							placeholder="Search..."
							className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
							value={search}
							inputProps={{
								'aria-label': 'Search'
							}}
							onChange={handleSearch}
							variant="outlined"
							InputLabelProps={{
								shrink: true
							}}
						/>
					</div>
				</div >

				<div className="p-12">
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<div className="widget flex p-12" style={{ width: "80%" }}>
							<PersonalTrainingCalendar />
						</div>
						<div className="flex-column" style={{ width: "20%" }}>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={trainings.length} title={"Total"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={trainings.filter(t => t.status === 'pending').length} title={"Ongoing Trainings"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={trainings.filter(t => t.status === 'approved').length} title={"Upcoming Trainings"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={trainings.filter(t => t.status === 'rejected').length} title={"Available Trainings"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={trainings.filter(t => t.status === 'completed').length} title={"Completed Trainings"} />
							</div>
						</div>
					</FuseAnimateGroup>
				</div>
			</div >
		</ThemeProvider >
	);
}

export default withReducer('personalTraining', reducer)(PersonalTrainingDashboard);
