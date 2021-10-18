import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

// Components
import LeaveDays from './leaveDays';
import Schedule from './schedule';
import UpcomingEvents from './upcomingEvents';
import Holiday from './holiday';
import AttendanceSummary from './attendanceSummary';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%'
	},
	figureContainer: {
		minHeight: '15rem',
		display: 'grid',
		placeItems: 'center'
	}
}));

const EmployeeDashboard = () => {
	const classes = useStyles();

	return (
		<>
			<Typography variant="h3" className="font-bold mb-24">
				Welcome John!
			</Typography>

			<Grid container spacing={2} alignItems="flex-start">
				<Grid container item lg={12} md={12} sm={12} xs={12} spacing={2} alignItems="stretch">
					<Grid item lg={9} md={9} sm={12} xs={12} spacing={2}>
						<Schedule />
					</Grid>

					<UpcomingEvents />
				</Grid>

				<Grid container item lg={12} md={12} sm={12} xs={12} alignItems="stretch" spacing={2}>
					<Grid item lg={4} md={4} sm={12} xs={12}>
						<Holiday />
					</Grid>

					<Grid item lg={4} md={4} sm={12} xs={12}>
						<Holiday />
					</Grid>

					<Grid item lg={4} md={4} sm={12} xs={12}>
						<LeaveDays />
					</Grid>

					<Grid item lg={7} md={7} sm={12} xs={12}>
						<AttendanceSummary />
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};
export default EmployeeDashboard;
