import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppraisalComponent from './AppraisalComponent';

const useStyles = makeStyles(theme => ({
	performanceAppraisalDiv: {
		borderLeft: '2px solid #666666',
		margin: '7% 0 0 5%',

		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	theHrTurnedVertical: {
		color: '#C4C4C4',
		transform: 'rotate(90deg)',
		height: 1,
		backgroundColor: '#c4c4c4',
		width: '20%'
	}
}));

const PerformanceAppraisal = () => {
	const classes = useStyles();

	const appraisals = [
		{
			id: 1,
			name: 'Behavioral Attributes',
			type: 'ba'
		},
		{
			id: 2,
			name: 'Summary of Performance Review',
			type: 'sopr'
		},
		{
			id: 3,
			name: 'Personnel Developmental Needs',
			type: 'pdn'
		}
	];

	return (
		<div className={` ${classes.performanceAppraisalDiv}`}>
			{/* <hr className={` ${classes.theHrTurnedVertical}`} /> */}
			{appraisals.map(({ name, id, type }) => (
				<AppraisalComponent key={id} name={name} type={type} />
			))}
		</div>
	);
};

export default PerformanceAppraisal;
