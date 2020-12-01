import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import reducer from '../store/reducers';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
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
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const trainings = useSelector(({ personalTraining }) => personalTraining.trainings.trainings);

	const classes = useStyles(props);
	const [search, setSearch] = useState('');

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
						<div className="widget flex p-12 flex-col" style={{ width: "80%" }}>
							<h2 className="mb-24">Training Calendar</h2>
							<PersonalTrainingCalendar />
						</div>
						<div className="flex-column" style={{ width: "20%" }}>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={89} title={"Ongoing Trainings"} color={"orange"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={9} title={"Upcoming Trainings"} color={"blue"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={30} title={"Available Trainings"} color={"purple"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={40} title={"Completed Trainings"} color={"green"} />
							</div>
						</div>
					</FuseAnimateGroup>
				</div>
			</div >
		</ThemeProvider >
	);
}

export default withReducer('personalTraining', reducer)(PersonalTrainingDashboard);
