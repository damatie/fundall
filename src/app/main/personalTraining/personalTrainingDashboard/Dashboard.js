import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import reducer from '../store/reducers';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import CardWidget from 'app/shared/widgets/CardWidget';
import PersonalTrainingCalendar from '../personalTrainingCalendar';
import { Grid, MenuItem, Paper } from '@material-ui/core';
import SharedTable from 'app/shared/sharedTable';
import SelectTextField from 'app/shared/TextInput/SelectTextField';

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
const rows = [
	{
		id: 'name',
		field: 'name',
		align: 'center',
		disablePadding: false,
		label: 'Course Name',
		sort: true
	},
	{
		id: 'category',
		field: 'category',
		align: 'center',
		disablePadding: false,
		label: 'Category',
		sort: true
	},
	{
		id: 'startDate',
		type: 'date',
		align: 'center',
		disablePadding: false,
		label: 'Start Date',
		sort: true
	},
	{
		id: 'endDate',
		type: 'date',
		align: 'center',
		disablePadding: false,
		label: 'End Date',
		sort: true
	},
	{
		id: 'location',
		field: 'location',
		align: 'center',
		disablePadding: false,
		label: 'Location',
		sort: true
	},
	{
		id: 'status',
		field: 'status',
		align: 'center',
		disablePadding: false,
		label: 'Status',
		sort: true
	}
];

function PersonalTrainingDashboard(props) {
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const data = [
		{
			name: "React Native Studies",
			category: "Technical",
			startDate: new Date(),
			endDate: new Date(),
			location: "Alaba, Nigeria",
			status: "pending"
		},
		{
			name: "React Native Studies",
			category: "Technical",
			startDate: new Date(),
			endDate: new Date(),
			location: "Nairobi, Kenya",
			status: "pending"
		},
		{
			name: "React Native Studies",
			category: "Technical",
			startDate: new Date(),
			endDate: new Date(),
			location: "Cairo, Egypt",
			status: "pending"
		}
	];

	const classes = useStyles(props);

	const goToPreviousRoute = () => {
		window.location = '/training/personal';
	}

	const routeToMe = () => {
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

				<div className="p-12">
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<div className="widget flex p-12 flex-col" style={{ width: "80%" }}>
							<PersonalTrainingCalendar title='Training Calendar' />
						</div>
						<div className="flex-column" style={{ width: "20%" }}>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={89} title={"Ongoing Trainings"} color={"orange"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={9} title={"Upcoming Trainings In 30 Days"} color={"blue"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={30} title={"Available Trainings"} color={"purple"} />
							</div>
							<div className="widget flex w-full p-12"  >
								<CardWidget count={40} title={"Completed Trainings"} color={"green"} />
							</div>
						</div>
					</FuseAnimateGroup>

					<Paper className="mt-24 m-10">
						<Typography variant="subtitle1" color="inherit" className="p-24 pb-0">Upcoming Trainings</Typography>
						<Grid container spacing={3} alignItems='center' className="p-24">
							<Grid item lg={2}>
								<SelectTextField
									value={2020}
									size='small'
									label='Year'
								>
									{[2019, 2020, 2021].map(item => (
										<MenuItem value={item}>
											{item}
										</MenuItem>
									))}
								</SelectTextField>
							</Grid>
							<Grid item lg={2}>
								<SelectTextField
									value={"Jan"}
									size='small'
									label='Month'
								>
									{["Jan", "Feb", "March", "April", "May", "June"].map(item => (
										<MenuItem value={item}>
											{item}
										</MenuItem>
									))}
								</SelectTextField>
							</Grid>
						</Grid>
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<div className="widget flex w-full p-12">
								<SharedTable data={data ?? []} rows={rows} type="default" />
							</div>
						</FuseAnimateGroup>
					</Paper>
				</div>
			</div >
		</ThemeProvider >
	);
}

withReducer('personalTraining', reducer)(PersonalTrainingDashboard);
export default withReducer('TrainingCategory', reducer)(PersonalTrainingDashboard);
