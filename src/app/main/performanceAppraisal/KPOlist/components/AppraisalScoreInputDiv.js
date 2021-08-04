import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	totalScoreDiv: {
		display: 'flex',
		marginBottom: '9%',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	totalScoreSpan: {
		fontWeight: 800,
		display: 'inline-block',
		marginRight: '5%'
	},
	totalScoreInput: {
		height: 40
	},
	notDisabled: {
		backgroundColor: '#E5E5E5'
	},
	disabled: {
		backgroundColor: '#C6C6C6'
	}
}));

const AppraisalScoreInputDiv = ({ spanText, inputValue, disabled }) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.totalScoreDiv}`}>
			<span className={` ${classes.totalScoreSpan}`}>{spanText}</span>
			<input
				className={` ${classes.totalScoreInput} ${disabled ? classes.disabled : classes.notDisabled}`}
				value={inputValue}
				disabled
				type="text"
			/>
		</div>
	);
};

export default AppraisalScoreInputDiv;
