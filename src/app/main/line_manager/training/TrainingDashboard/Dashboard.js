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
// import * as Actions from '../store/actions';
// import reducer from '../store/reducers';
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
import PersonalTrainingCalendar from 'app/main/personalTraining/personalTrainingCalendar';

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

function LineManagerDashboard(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const classes = useStyles(props);
	const [search, setSearch] = useState('');

	useEffect(() => {
	}, [dispatch]);

	function handleSearch(event) {
		setSearch(event.target.value);
	}

	const goToPreviousRoute = () => {
		window.location = '/training/personal';
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
							LINE MANAGER TRAINING DASHBOARD
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
						<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
							<CardWidget count={[].length} title={"Total Trainings"} color="yellow" />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
							<CardWidget count={[].filter(t => t.status === 'pending').length} title={"Pending Trainings"} color="blue" />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
							<CardWidget count={[].filter(t => t.status === 'approved').length} title={"Approved Trainings"} color="green" />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
							<CardWidget count={[].filter(t => t.status === 'rejected').length} title={"Rejected Trainings"} color="red" />
						</div>
						<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
							<CardWidget count={[].filter(t => t.status === 'reviewed').length} title={"Reviewed Trainings"} color="orange" />
						</div>
						<div className="widget flex w-full p-12">
							<div style={{ width: "60%" }}>
								<PersonalTrainingCalendar />
							</div>
							<div>

							</div>
						</div>
					</FuseAnimateGroup>
				</div>
			</div >
		</ThemeProvider >
	);
}

export default withReducer('personalTraining', null)(LineManagerDashboard);
