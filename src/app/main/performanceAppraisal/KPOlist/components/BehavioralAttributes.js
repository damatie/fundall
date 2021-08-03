import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
	behavioralAttributesDiv: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '10%',
		marginLeft: '18%'
	},
	behavioralAttribute: {
		marginBottom: '6%',

		'&:last-child': {
			marginBottom: 0
		}
	},
	playArrowIcon: {
		cursor: 'pointer',
		marginLeft: '3%'
	},
	baSpan: {
		fontWeight: 700,
		fontSize: 14
	}
}));

const BehavioralAttributes = () => {
	const classes = useStyles();

	const behavioralAttributes = [
		{
			id: 1,
			label: 'Commitment and Leadership'
		},
		{
			id: 2,
			label: 'Integrity'
		},
		{
			id: 1,
			label: 'Teamwork'
		},
		{
			id: 1,
			label: 'Personal Drive'
		}
	];

	return (
		<div className={` ${classes.behavioralAttributesDiv}`}>
			{behavioralAttributes.map(ba => (
				<div className={` ${classes.behavioralAttribute}`} key={ba.id}>
					<span className={` ${classes.baSpan}`}>{ba.label}</span>
					<PlayArrowIcon className={` ${classes.playArrowIcon}`} />
				</div>
			))}
		</div>
	);
};

export default BehavioralAttributes;
