import React from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';

// Components
import Card from './card';

const useStyles = makeStyles(() => ({
	root: {
		height: '100%'
	},
	status: {
		display: 'flex',
		alignItems: 'center'
	},
	dot: {
		height: 10,
		width: 10,
		borderRadius: '50%'
	}
}));

const labels = ['Pending Approval', 'Ongoing', 'Approved', 'Completed'];
const colors = ['#FF6C40', '#826AF9', '#2D99FF', '#2CD9C5'];

const data = {
	labels,
	datasets: [
		{
			label: '2020',
			data: [100, 600, 200, 100],
			backgroundColor: colors,
			borderColor: colors,
			borderWidth: 0
		}
	]
};

const TrainingStatus = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<Typography variant="h6" className="text-center">
				Status Of Training In Organization
			</Typography>
			<div className="my-20">
				<Pie
					data={data}
					options={{
						legend: {
							display: false
						}
					}}
				/>
			</div>

			<Grid container>
				{labels.map((label, index) => (
					<Grid key={label} item lg={6} md={6} sm={6} xs={6} className={classes.status}>
						<div style={{ backgroundColor: colors[index] }} className={`${classes.dot} mr-10`} />
						<Typography>{label}</Typography>
					</Grid>
				))}
			</Grid>
		</Card>
	);
};

export default TrainingStatus;
