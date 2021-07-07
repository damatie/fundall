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
// import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
// import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { blue } from '@material-ui/core/colors';
import Moment from 'react-moment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useAuth } from 'app/hooks/useAuth';
// import { authRoles } from 'app/auth';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from 'react-router';

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

function PersonalTrainingCourses(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const courses = useSelector(({ academyApp }) => academyApp.courses.courses);
	const categories = useSelector(({ academyApp }) => academyApp.courses.categories.rows);
	const employees = useSelector(({ academyApp }) => academyApp.employees.employees);
	const totalNo = useSelector(({ academyApp }) => academyApp.courses.totalNo);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const classes = useStyles(props);
	const theme = useTheme();
	const [data, setData] = useState(courses);
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
	const userId = useAuth().getId;
	const employeeHOD = useAuth().getUserDetails.department.departmentHeadId;
	const [filterEmployees, setFilterEmployees] = useState(
		employees.filter(f => {
			return (f.firstName !== null || f.lastName !== null || f?.role.name.toLowerCase() !== 'employee' || f?.roleId !== 8);
		}).sort((a, b) => {
			if (a.firstName + " " + a.lastName < b.firstName + " " + b.lastName) { return -1; }
			if (a.firstName + " " + a.lastName > b.firstName + " " + b.lastName) { return 1; }
			return 0;
		})
	);

	useEffect(() => {
		dispatch(Actions.getAllCourses());
		dispatch(Actions.getCourseCategories());
		dispatch(Actions.getEmployees());
		setData(courses)
	}, [dispatch]);

	useEffect(() => {
		if (search.length >= 2) {
			setData(_.filter(courses, row => row.name.toLowerCase().includes(search.toLowerCase())));
		} else {
			setData(courses);
		}
	}, [courses, search]);

	useEffect(() => {
		if (filter !== 'all') {
			setData(_.filter(courses, row => row.category.toLowerCase() === filter.toLowerCase()));
		} else {
			setData(courses);
		}
	}, [courses, filter]);

	useEffect(() => {
		if (employees.length > 0) {
			setFilterEmployees(_.filter(employees, em => em.id !== userId && em.firstName !== null));
		}
	}, [employees]);

	function handleSearch(event) {
		setSearch(event.target.value);
	}

	function handleFilter(event) {
		setFilter(event.target.value);
	}

	// function canBeSubmitted() {
	// 	if (checkRole()) {
	// 		return (start !== '' && hod !== 0);
	// 	} else {
	// 		return start !== '';
	// 	}
	// }

	const handleChangePage = (event, value) => {
		// console.log(value);
		let newPage = value - 1;
		dispatch(Actions.getAllCourses(rowsPerPage, newPage * rowsPerPage));
		setPage(value);
		window.scrollTo(0, 0);
		// alert('hello')
	};

	//Check if the logged in user has management role
	// function checkRole() {
	// 	return (authRoles.managers.includes(userData.role));
	// }

	function handleSubmit(event) {
		event.preventDefault();
		// if (userData.role === "Employee") {
		dispatch(Actions.requestTraining(id, history));
		setOpen(false);
		return;
		// }
		// // console.log(duration);
		// //let Trim the duration value to remove white space
		// let durations = duration.trim();
		// //let Split the duration to get first part of the array as the number and convert it to interger
		// let number = parseInt(durations.split(' ')[0]);
		// //let split the duration and get the second part of the array.
		// let months = durations.split(' ')[1].toLowerCase().includes('s')
		// 	? durations.split(' ')[1].toLowerCase()
		// 	: durations.split(' ')[1].toLowerCase() + 's';

		// //constructing our training request payload
		// const payload = {
		// 	trainingCourseId: id,
		// 	departmentHead: hod === 0 ? (employeeHOD != null ? employeeHOD : 13) : hod,
		// 	hrManager: 4,
		// 	startDate: start.format('DD-MM-YYYY'),
		// 	endDate: end.add(number, months).format('DD-MM-YYYY')
		// };
		// // console.log(payload);
		// dispatch(Actions.createTraining(payload));
		// setOpen(false);
	}

	// function handleDateChange(date) {
	// 	setStart(date);
	// 	setEnd(date);
	// }

	const goToPreviousRoute = () => {
		window.location = '/training/personal';
	}

	function handleClose() {
		setOpen(false);
	}

	function handleOpen() {
		setOpen(true);
	}

	// const CaptializeFirstLetter = (word) => {
	// 	if (word) {
	// 		return word.charAt(0).toUpperCase() + word.slice(1);
	// 	}
	// 	return '';
	// }

	// function handleSelectChange(name) {
	// 	let hodDetails = filterEmployees.find(em => {
	// 		return em.firstName.toLowerCase() + ' ' + em.lastName.toLowerCase() === name.toLowerCase();
	// 	});
	// 	setHod(hodDetails.id);
	// }

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
							COURSE LIST
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
					<div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
						<TextField
							label="Search for a course"
							placeholder="Enter a keyword..."
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
						<FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
							<Select
								value={filter}
								onChange={handleFilter}
								input={
									<OutlinedInput labelWidth={'category'.length * 9} name="category" id="category-label-placeholder" />
								}
							>
								<MenuItem value="all">
									<em> All </em>
								</MenuItem>
								{categories?.map(category => (
									<MenuItem value={category.name} key={category.id}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					{useMemo(
						() =>
							data &&
							(data.length > 0 ?
								(
									<div>
										<FuseAnimateGroup
											enter={{
												animation: 'transition.slideUpBigIn'
											}}
											className="flex flex-wrap py-24"
										>
											{data.map(course => {
												return (
													<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.id}>
														<Card elevation={1} className="flex flex-col h-256">
															<div
																className="flex flex-shrink-0 items-center justify-between px-24 h-64"
																style={{
																	background: blue[500],
																	color: theme.palette.getContrastText(blue[500])
																}}
															>
																<Typography className="font-medium truncate" color="inherit">
																	{course.category}
																</Typography>
																<div className="flex items-center justify-center opacity-75">
																	<Icon className="text-20 mx-8" color="inherit">
																		access_time
															</Icon>
																	<div className="text-16 whitespace-no-wrap">{course.duration}</div>
																</div>
															</div>
															<CardContent className="flex flex-col flex-auto items-center justify-center">
																<Typography className="text-center text-20 font-400">{course.name}</Typography>
																<Typography className="text-center text-16 font-600" color="textSecondary">
																	{course.certification ? 'Certificate Available' : 'Certificate Not Available'}
																</Typography>
																<Typography className="text-center text-13 font-600 mt-4" color="textSecondary">
																	<Moment format="MMM DD, YYYY">{course.createdAt}</Moment>
																</Typography>
															</CardContent>
															<Divider />
															<Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
																<AppBar position="static">
																	<Toolbar className="flex w-full">
																		<Typography variant="subtitle1" color="inherit">
																			{'New Training Request'}
																		</Typography>
																	</Toolbar>
																</AppBar>
																<form noValidate onSubmit={ev => handleSubmit(ev)}>
																	<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
																		{/* <Autocomplete
																		hidden={!checkRole()}
																		freeSolo
																		options={
																			filterEmployees &&
																			filterEmployees.map(option => option && (CaptializeFirstLetter(option.firstName) + ' ' + CaptializeFirstLetter(option.lastName)))
																		}
																		onChange={(ev, value) => handleSelectChange(value)}
																		renderInput={params => (
																			<TextField
																				{...params}
																				label="Head Of Department"
																				margin="normal"
																				variant="outlined"
																				required
																			/>
																		)}
																	/>

																	<DateTimePicker
																		label="Start"
																		inputVariant="outlined"
																		value={start}
																		onChange={date => handleDateChange(date)}
																		className="mt-8 mb-16 w-full"
																		minDate={start}
																		format={'MMMM Do, YYYY hh:mm a'}
																	/> */}

																		<Typography variant="subtitle1" color="inherit" className="mb-24" >Are you sure you want to request for this course ?</Typography>
																	</DialogContent>
																	<DialogActions className="justify-between px-8 sm:px-16">
																		<Button variant="contained" color="primary" type="submit" >
																			Add
																</Button>
																	</DialogActions>
																</form>
															</Dialog>
															<CardActions className="justify-center">
																<Button
																	type="button"
																	className="justify-start px-32"
																	color="secondary"
																	onClick={ev => {
																		handleOpen();

																		setId(course.id);
																		setDuration(course.duration);
																		setStart(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
																	}}
																>
																	START
															</Button>
															</CardActions>
															<LinearProgress className="w-full" variant="determinate" value={100} color="secondary" />
														</Card>
													</div>
												);
											})}
										</FuseAnimateGroup>
										<div className={classes.pagination}>
											<Pagination count={Math.round(totalNo / rowsPerPage)} page={page} onChange={handleChangePage} color="primary" />
										</div>
									</div>
								) : (
									<div className="flex flex-1 items-center justify-center">
										<Typography color="textSecondary" className="text-24 my-24">
											No course(s) found!
										</Typography>
									</div>
								)
							),
						[categories, data, employees, filterEmployees, open, id, start, end, hod, page, theme.palette]
					)}
				</div>
			</div>
		</ThemeProvider>
	);
}

export default withReducer('academyApp', reducer)(PersonalTrainingCourses);
