import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	textSummaryDiv: {
		width: '46%',
		marginBottom: '5%'
	},
	performanceReviewLabelDiv: {
		display: 'flex',
		color: '#AAAAAA',

		'& span': {
			display: 'inline-block',
			marginRight: '2%'
		}
	},
	textArea: {
		width: '100%',
		marginTop: '2%',
		color: '#242424',
		fontSize: 13
	}
}));

const TextSummaryPerformanceReview = ({ index, label, value }) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.textSummaryDiv}`}>
			<div className={` ${classes.performanceReviewLabelDiv}`}>
				{index && <span>{index}.</span>}
				<span>{label}</span>
			</div>
			<p className={` ${classes.textArea}`}>{value}</p>
		</div>
	);
};

export default TextSummaryPerformanceReview;
