import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
	behavioralAttributeDiv: {
		display: 'flex'
	},
	playArrowIcon: {
		fontSize: 12,
		cursor: 'pointer'
	}
}));

const BehavioralAttribute = ({ label }) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.behavioralAttributeDiv}`}>
			<span>{label}</span>
			<PlayArrowIcon className={` ${classes.playArrowIcon}`} />
		</div>
	);
};

export default BehavioralAttribute;
