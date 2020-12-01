import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React from "react";
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import CardWidget from 'app/shared/widgets/CardWidget';
import PersonalTrainingCalendar from 'app/main/personalTraining/personalTrainingCalendar';
import BarChart from 'app/shared/charts/BarChart';
import { Paper } from '@material-ui/core';

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


const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'Training Chart',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

function LineManagerDashboard(props) {
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const classes = useStyles(props);

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

				<div className="p-12">
					<FuseAnimateGroup
						className="flex-column"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<div className="widget flex flex-wrap w-full mt-24">
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={37} title={"Pending Trainings"} color="yellow" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={70} title={"Ongoing Trainings"} color="orange" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={20} title={"Upcoming Trainings In 30 Days"} color="purple" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={90} title={"Overall Trainings In Department"} color="green" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={86} title={"Employees in Trainings"} color="black" />
							</div>
						</div>
						{/* <div className="widget flex w-full p-12 m-10 justify-between"> */}
						<Paper className="flex my-20 justify-center align-center flex-col p-24">
								<h2 className="text-center mb-24">Number Of Employees Currently Under</h2>
								<BarChart data={data} height='100%'/>
							</Paper>
							<div className='my-20'>
								<PersonalTrainingCalendar title='Trainings Calendar'/>
							</div>
							
						{/* </div> */}
					</FuseAnimateGroup>
				</div>
			</div>
		</ThemeProvider >
	);
}

export default withReducer('personalTraining', null)(LineManagerDashboard);
