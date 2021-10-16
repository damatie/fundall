import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

// Components
import Card from './card';
import UpcomingEvents from './upcomingEvents';
import EntityTable from './entityTable';
import TrainingCategory from './trainingCategory';
import TrainingStatus from './trainingStatus';

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

const HRDashboard = () => {
	const classes = useStyles();

	return (
		<Grid container spacing={2} alignItems="flex-start">
			<Grid container item lg={9} md={9} sm={12} xs={12} spacing={2} alignItems="stretch">
				<Grid container item lg={4} md={4} sm={12} xs={12} spacing={2}>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Card>
							<Typography variant="h6" className="text-center">
								Total Employees
							</Typography>
							<div className={classes.figureContainer}>
								<Typography variant="h4" className="font-bold">
									2803
								</Typography>
							</div>
						</Card>
					</Grid>

					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Card>
							<Typography variant="h6" className="text-center">
								New Employees in 10 days
							</Typography>
							<div className={classes.figureContainer}>
								<Typography variant="h4" className="font-bold">
									201
								</Typography>
							</div>
						</Card>
					</Grid>
				</Grid>

				<Grid item lg={4} md={4} sm={12} xs={12}>
					<TrainingStatus />
				</Grid>

				<Grid item lg={4} md={4} sm={12} xs={12}>
					<TrainingCategory />
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<EntityTable />
				</Grid>
			</Grid>

			<UpcomingEvents />
		</Grid>
	);
};
export default HRDashboard;
