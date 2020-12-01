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
import LineGraphChart from 'app/shared/charts/LineGraphChart';
import BarChart from 'app/shared/charts/BarChart';
import { Grid, MenuItem, Paper } from '@material-ui/core';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import DoughnutChart from 'app/shared/charts/DoughnutChart';
import EnhancedTable from 'app/main/contact_list/ContactsTable';
// import data from "./data.json";

const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", 'September', "October", "November", "December"],
	datasets: [
		{
			label: 'Open Positions per Department',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'orange',
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
			data: [65, 59, 80, 81, 56, 55, 40, 12, 46, 93, 25, 35]
		}
	]
};

const data2 = {
	labels: ['LinkedIn', 'Facebook', 'Instagram', 'Google', 'Newspaper', 'Radio', 'Job Ads', "Friends", 'Family'],
	datasets: [
		{
			label: 'Referals Statistics',
			fill: false,
			lineTension: 0.1,
			backgroundColor: '#2196F3',
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
			data: [65, 59, 80, 81, 40, 12, 46, 93, 25, 35]
		}
	]
};
const data3 = {
	labels: ['Job Advert', 'Applications', 'Screened Candidate', 'Manager Interview', 'Onsite Interview', 'Offer', 'Hire', "Days Of Hire"],
	datasets: [
		{
			label: 'Recruitment Funnel',
			fill: false,
			lineTension: 0.1,
			backgroundColor: ['rgba(75,192,192,0.4)', "#F45448", "#2196F3", "#9C27B0", "#FFA500", "#4CAF50", "#F44336", "#BB6BC9", "#c4c4c4", "maroon"],
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
			data: [65, 59, 80, 81, 40, 12, 46, 93, 25, 35]
		}
	]
};

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

	const tableData = [
		{
			id: 1,
			full_name: 'John Doe',
			email: 'loremp@gmail.com',
			job_title: 'Backend Engineer',
			date_applied: 'May 12',
			status: "Rejected"
		},
		{
			id: 2,
			full_name: 'Williams Joseph Bankole',
			email: 'willie89@gmail.com',
			job_title: 'CEO',
			date_applied: 'March 1',
			status: "Saved"
		},
		{
			id: 3,
			full_name: 'Iyan Idowu Akande',
			email: 'femijay9@gmail.com',
			job_title: 'Backend Engineer',
			date_applied: 'Oct 12',
			status: "Saved"
		},
		{
			id: 4,
			full_name: 'Marcus Alaba Jakande',
			email: 'femijay9@gmail.com',
			job_title: 'DevOps Engineer',
			date_applied: 'Oct 1',
			status: "Hired"
		},
		{
			id: 5,
			full_name: 'Adegoke Joshua Oluwafemi',
			email: 'femijay9@gmail.com',
			job_title: 'Frontend Engineer',
			date_applied: 'Dec 12',
			status: "Pending"
		}
	];

	const columns = React.useMemo(
		() => [
			{
				Header: 'S/N',
				accessor: "id",
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Full Name',
				accessor: 'full_name',
				sortable: true
			},
			{
				Header: 'Email',
				accessor: 'email',
				sortable: true
			},
			{
				Header: 'Job Title',
				accessor: 'job_title',
				sortable: true
			},
			{
				Header: 'Date Applied',
				accessor: 'date_applied',
				sortable: true
			},
			{
				Header: 'Current Status',
				accessor: 'status',
				sortable: true
			}
		]
	);


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

				<div className="p-12 mt-24">
					<FuseAnimateGroup
						className="flex-column"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<div className="widget flex flex-wrap w-full">
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={[].length} title={"Total Openings"} color="orange" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={[].filter(t => t.status === 'pending').length} title={"Total Applicants"} color="purple" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={[].filter(t => t.status === 'approved').length} title={"Shortlisted Applicants"} color="blue" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={[].filter(t => t.status === 'rejected').length} title={"Rejected Applicants"} color="red" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/5 p-12">
								<CardWidget count={[].filter(t => t.status === 'reviewed').length} title={"Hired Applicants"} color="green" />
							</div>
						</div>
						<div className="widget flex p-12 m-10 justify-between">
							<Paper className="p-24 " style={{ width: "49%" }}>
								<h2 className="text-center mb-24">Overall Open positions per department</h2>
								<Grid container spacing={3} alignItems='center'>
									<Grid item lg={2}>
										<SelectTextField
											value={2020}
											size='small'
											label='Year'
										>
											{[2019, 2020].map(item => (
												<MenuItem value={item}>
													{item}
												</MenuItem>
											))}
										</SelectTextField>
									</Grid>
								</Grid>
								<BarChart
									data={data}
								/>
							</Paper>

							<Paper style={{ width: "49%" }} className="flex-column justify-center align-center p-24">
								<div>
									<h2 className="text-center mb-24">Referrals Statistics</h2>
									<Grid container spacing={3} alignItems='center' className={"mb-24"}>
										<Grid item lg={2}>
											<SelectTextField
												value={2020}
												size='small'
												label='Year'
											>
												{[2019, 2020].map(item => (
													<MenuItem value={item}>
														{item}
													</MenuItem>
												))}
											</SelectTextField>
										</Grid>
									</Grid>
									<BarChart
										data={data2}
									/>
								</div>
								<div className="mt-24">
									<h2 className="text-center mb-24">Recruitment Funnel</h2>
									<Grid container spacing={3} alignItems='center' className={"mb-24"}>
										<Grid item lg={2} >
											<SelectTextField
												value={2020}
												size='small'
												label='Year'
											>
												{[2019, 2020].map(item => (
													<MenuItem value={item}>
														{item}
													</MenuItem>
												))}
											</SelectTextField>

										</Grid>
									</Grid>
									<DoughnutChart
										doughnutStyle={"justify-center align-center w-full"}
										data={data3}
									/>
								</div>
							</Paper>
						</div>

						<Paper className="p-24 m-10">
							<h2 className="text-center mb-48">Applicants Mini Data</h2>

							<Grid container spacing={3} alignItems='center' className="mb-24">
								<Grid item lg={2}>
									<SelectTextField
										value={2020}
										size='small'
										label='Year'
									>
										{[2019, 2020].map(item => (
											<MenuItem value={item}>
												{item}
											</MenuItem>
										))}
									</SelectTextField>
								</Grid>
								<Grid item lg={2}>
									<SelectTextField
										value={"SpringRock"}
										size='small'
										label='Entity'
									>
										{["5Cee", "SpringRock", "HRIS", "SREP"].map(item => (
											<MenuItem value={item}>
												{item}
											</MenuItem>
										))}
									</SelectTextField>
								</Grid>
								<Grid item lg={2}>
									<SelectTextField
										value={"Software"}
										size='small'
										label='Department'
									>
										{["5Cee", "SpringRock", "HRIS", "SREP", "Software"].map(item => (
											<MenuItem value={item}>
												{item}
											</MenuItem>
										))}
									</SelectTextField>
								</Grid>
							</Grid>

							<EnhancedTable
								columns={columns}
								data={tableData}
								selectAll={(value) => console.log(value)}
							/>
						</Paper>
					</FuseAnimateGroup>
				</div>
			</div >
		</ThemeProvider >
	);
}

export default withReducer('personalTraining', null)(Recruitment);
