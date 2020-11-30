import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	chart: {
		position: 'relative',
	},
	text: {
		position: 'absolute',
		top: '45%',
		left: '50%',
		transform: 'translate(-50%, -40%)',
		fontWeight: 'bold',
		color: props => props.color,
		fontSize: 30
	}
}))


const DoughnutChart = ({ data, percentage, doughnutStyle }) => {
	const classes = useStyles({ color: data.datasets[0].backgroundColor[1] });
	return (
		<div className={`flex flex-col items-center w-full ${classes.chart} ${doughnutStyle}`} >
			<Doughnut data={data} options={{
				legend: {
					position: 'bottom'
				}
			}} />
			<Typography variant="h6" color="initial" className={classes.text}>{percentage}</Typography>
		</div>
	);
}

export default DoughnutChart;