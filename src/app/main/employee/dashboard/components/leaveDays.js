import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import RightArrowIcon from '@material-ui/icons/ArrowRightAlt';
import { Doughnut } from 'react-chartjs-2';

// Components
import Card from './card';

const useStyles = makeStyles(() => ({
	chartContainer: {
		position: 'relative',
		minHeight: 400,
		display: 'grid',
		alignContent: 'center',
		alignItems: 'center',
		justifyItems: 'center'
	},
	descriptionContainer: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	}
}));

const colors = ['#26c0c7', '#ff0000'];

const LeaveDays = () => {
	const classes = useStyles();
	const percentage = 70;

	const data = {
		labels: ['Number of Used Leave Days', 'Number of Unused Leave Days'],
		datasets: [
			{
				label: 'Leave Days',
				data: [percentage, 100 - percentage],
				backgroundColor: colors,
				borderColor: colors,
				borderWidth: 0
			}
		]
	};

	return (
		<Card style={{ width: '100%', height: '100%', padding: '3rem !important' }}>
			<div className="flex justify-between items-center mb-20">
				<Typography variant="h5" className="font-bold">
					Leave Days
				</Typography>

				<div className="flex justify-center items-center">
					<Typography className="mr-5">Apply for leave</Typography>
					<RightArrowIcon />
				</div>
			</div>

			<div className={classes.chartContainer}>
				<div className="flex justify-center items-center mb-20" style={{ width: '100%' }}>
					<div
						style={{ height: 10, width: 10, borderRadius: '50%', backgroundColor: colors[0], marginRight: '1rem' }}
					/>
					<Typography>Number of Used Leave Days</Typography>
				</div>
				<Doughnut
					data={data}
					options={{
						legend: {
							display: false
						},
						cutoutPercentage: 80
					}}
				/>
				<div className={classes.descriptionContainer}>
					<Typography className="text-center font-bold" variant="h5">{`${percentage}%`}</Typography>
					<Typography className="text-center">Used Leave Days</Typography>
				</div>
				<div className="flex justify-center items-center mt-20" style={{ width: '100%' }}>
					<div
						style={{ height: 10, width: 10, borderRadius: '50%', backgroundColor: colors[1], marginRight: '1rem' }}
					/>
					<Typography>Number of Unused Leave Days</Typography>
				</div>
			</div>
		</Card>
	);
};

export default LeaveDays;
