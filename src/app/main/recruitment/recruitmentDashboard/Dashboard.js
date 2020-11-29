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
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import CardWidget from 'app/shared/widgets/CardWidget';
import CardWidgetWithChart from 'app/shared/widgets/CardWidgetWithChart';
import useRecruitmentDashboard from '../hooks/customHook';
import data from "./data.json";
import Widget from './component/widget';

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

function Recruitment(props) {
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const classes = useStyles(props);
	const [search, setSearch] = useState('');

	// const widgets = useSelector(({ projectDashboardApp }) => projectDashboardApp.widgets);
	const widgets = data;


	const { doughnutChartData } = useRecruitmentDashboard();

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
							HR RECRUITMENT DASHBOARD
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
						className="flex-column"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<div className="widget flex flex-wrap w-full">
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={[].length} title={"Total Openings"} color="yellow" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={[].filter(t => t.status === 'pending').length} title={"Total Applicants"} color="blue" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={[].filter(t => t.status === 'approved').length} title={"Shortlisted Applicants"} color="green" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={[].filter(t => t.status === 'rejected').length} title={"Rejected Applicants"} color="red" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={[].filter(t => t.status === 'reviewed').length} title={"Hired Applicants"} color="orange" />
							</div>
						</div>
						<div className="widget flex w-full p-12 m-10 justify-between">
							<div style={{ width: "54%" }}>
								<Widget widget={widgets} />
							</div>
							<div style={{ width: "44%" }} className="flex-column justify-center align-center">
								<CardWidgetWithChart
									title={"Application Source / Referrals"}
									data={doughnutChartData}
									customStyle={"flex-column justify-center align-center"}
								/>
								<CardWidgetWithChart
									title={"Recruitment Funnel"}
									data={doughnutChartData}
									customStyle={"flex-column justify-center align-center p-12"}
								/>
							</div>
						</div>
					</FuseAnimateGroup>
				</div>
			</div >
		</ThemeProvider >
	);
}

export default withReducer('personalTraining', null)(Recruitment);
