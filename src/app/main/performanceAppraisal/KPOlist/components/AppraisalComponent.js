import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import identifier from '../../../../../assets/icons/identifier.svg';
import BehavioralAttributes from './BehavioralAttributes';

const useStyles = makeStyles(theme => ({
	appraisalComponentDiv: {
		marginBottom: '6%'
	},
	appraisalComponentLabel: {
		display: 'flex'
	},
	identifierDiv: {
		display: 'flex',
		width: '11%',
		// marginTop: '-1.4%',

		'& img': {
			width: '100%'
		} /* ,

		[theme.breakpoints.down('md')]: {
			width: '15%',
			marginTop: '-1.9%'
		} */
	},
	spanAndCaret: {
		display: 'flex',
		marginLeft: '1.5%',
		width: '50%',
		alignItems: 'center',

		'& span': {
			cursor: 'pointer',
			fontWeight: 600,
			fontSize: 20
		}
	},
	caretIcon: {
		// fontSize: 12,
		color: '#c4c4c4',
		alignSelf: 'center',
		marginLeft: '2%',
		cursor: 'pointer'
	}
}));

function AppraisalComponentLabel({ theName, toggleFunction, toggleVariable }) {
	const classes = useStyles();

	return (
		<div className={` ${classes.appraisalComponentLabel}`}>
			<div className={` ${classes.identifierDiv}`}>
				<img src={identifier} alt="identifier" />
			</div>
			<div className={` ${classes.spanAndCaret}`}>
				<span>{theName}</span>
				{toggleVariable ? (
					<span onClick={toggleFunction}>
						<ExpandMoreIcon className={` ${classes.caretIcon}`} />
					</span>
				) : (
					<span onClick={toggleFunction}>
						<ChevronRightIcon className={` ${classes.caretIcon}`} />
					</span>
				)}
			</div>
		</div>
	);
}

const AppraisalComponent = ({ name, type }) => {
	const classes = useStyles();
	const [expandDropDown, setExpandDropDown] = useState(false);

	const toggleExpandDropDown = () => {
		console.log('clicked');
		setExpandDropDown(!expandDropDown);
	};

	return (
		<div className={` ${classes.appraisalComponentDiv}`}>
			<AppraisalComponentLabel toggleFunction={toggleExpandDropDown} theName={name} toggleVariable={expandDropDown} />
			{expandDropDown && type === 'ba' ? <BehavioralAttributes /> : null}
		</div>
	);
};

export default AppraisalComponent;
