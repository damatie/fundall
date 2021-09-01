import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import gAPIdentifierGrey from '../../../../../assets/icons/gAPIdentifierGrey.svg';
import gAPIdentifierPurple from '../../../../../assets/icons/gAPIdentifierPurple.svg';
import pHMsg from '../../../../../assets/icons/pHMsg.png';
import PromotionalHistory from './PromotionalHistory';
import EmployeeInformationPromotion from './EmployeeInformationPromotion';

const useStyles = makeStyles(theme => ({
	gradeAndPromotionContentDiv: {
		marginBottom: '5%'
	},
	gradeAndPromotionComponentLabel: {
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
	employeeInformationImgDiv: {
		alignItems: 'flex-start',
		marginTop: '-0.5%'
	},
	promotionalHistoryImgDiv: {
		alignItems: 'flex-end'
	},
	pHMsgIcon: {
		// width: '50%'
	},
	spanAndCaret: {
		display: 'flex',
		marginLeft: '1.5%',
		width: '50%',
		alignItems: 'center',

		'& span': {
			cursor: 'pointer',
			fontWeight: 600,
			fontSize: 13,
			marginLeft: '2%'
		}
	},
	caretIcon: {
		// fontSize: 12,
		color: '#c4c4c4',
		alignSelf: 'center',
		marginLeft: '2%',
		cursor: 'pointer'
	},
	phName: {
		color: '#17005A'
	}
}));

function GradeAndPromotionComponentLabel({ theName, toggleFunction, toggleVariable, identifierColor }) {
	const classes = useStyles();

	return (
		<div className={` ${classes.gradeAndPromotionComponentLabel}`}>
			<div
				className={` ${classes.identifierDiv} `} /* ${
					identifierColor === 'grey'
						? classes.employeeInformationImgDiv
						: identifierColor === 'purple' && classes.promotionalHistoryImgDiv
				} */
			>
				<img
					src={identifierColor === 'grey' ? gAPIdentifierGrey : identifierColor === 'purple' && gAPIdentifierPurple}
					alt="identifier"
				/>
			</div>
			<div className={` ${classes.spanAndCaret}`}>
				{theName === 'Promotional History' && (
					<img className={` ${classes.pHMsgIcon}`} src={pHMsg} alt="message icon" />
				)}
				<span className={` ${theName === 'Promotional History' && classes.phName}`}>{theName}</span>
				{theName === 'Employee Information' ? null : toggleVariable ? (
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

const GradeAndPromotionContent = ({ userData, name }) => {
	const classes = useStyles();
	const [expandDropDown, setExpandDropDown] = useState(false);

	const toggleExpandDropDown = () => {
		console.log('clicked');
		setExpandDropDown(!expandDropDown);
	};

	return (
		<div className={` ${classes.gradeAndPromotionContentDiv}`}>
			<GradeAndPromotionComponentLabel
				toggleFunction={toggleExpandDropDown}
				theName={name}
				toggleVariable={expandDropDown}
				identifierColor={name === 'Employee Information' ? 'grey' : name === 'Promotional History' && 'purple'}
			/>
			{
				/* expandDropDown &&  */ name === 'Employee Information' ? (
					<EmployeeInformationPromotion employeeInformation={userData.employeeInformation} />
				) : (
					expandDropDown && name === 'Promotional History' && <PromotionalHistory history={userData.promotionHistory} />
				)
			}
		</div>
	);
};

export default GradeAndPromotionContent;
