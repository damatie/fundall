import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EmployeeInformationComponent from './EmployeeInformationComponent';

import BlueDot from '../../../../../assets/icons/blue-dot.svg';
import BlackDot from '../../../../../assets/icons/black-dot.svg';

const useStyles = makeStyles(theme => ({
	gradeAndPromotionContentDiv: {
		marginBottom: '5%'
	},
	employeeInformationContentLabel: {
		display: 'flex'
		// backgroundColor: '#ffffff'
	},
	identifierDiv: {
		display: 'flex' /* ,
		width: '10%' */,

		'& img': {
			width: '100%'
		} /* ,

		[theme.breakpoints.down('md')]: {
			width: '15%',
			marginTop: '-1.9%'
		} */
	},
	employeeInfoLabel: {
		width: '19%'
	},
	employeeInformationImgDiv: {
		alignItems: 'flex-start',
		marginTop: '-0.5%'
	},
	promotionalHistoryImgDiv: {
		alignItems: 'flex-end'
	},
	labelImg: {
		width: '3%'
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

function EmployeeInformationContentLabel({
	theName,
	toggleFunction,
	toggleVariable,
	identifier,
	noLabelImg,
	labelImg,
	color
}) {
	const classes = useStyles();

	return (
		<div className={` ${classes.employeeInformationContentLabel}`} onClick={toggleFunction}>
			{/* <div
				className={` ${classes.identifierDiv} ${theName === 'Employee Information' ? classes.employeeInfoLabel : ''}`}
			>
				<img src={identifier} alt="identifier" />
			</div> */}
			<div className={` ${classes.spanAndCaret}`}>
				<img src={BlackDot} alt="identifier" />
				<img className={` ${classes.labelImg}`} src={labelImg} alt="message icon" />
				<span style={{ color: color }}>{theName}</span>
				{/* {toggleVariable ? (
					<span onClick={toggleFunction}>
						<ExpandMoreIcon className={` ${classes.caretIcon}`} />
					</span>
				) : (
					<span onClick={toggleFunction}>
						<ChevronRightIcon className={` ${classes.caretIcon}`} />
					</span>
				)} */}
			</div>
		</div>
	);
}

const EmployeeInformationContent = ({ labelImg, name, content, color }) => {
	const classes = useStyles();
	const [expandDropDown, setExpandDropDown] = useState(false);

	const toggleExpandDropDown = () => {
		console.log('clicked');
		setExpandDropDown(!expandDropDown);
	};

	return (
		<div className={` ${classes.gradeAndPromotionContentDiv}`}>
			<EmployeeInformationContentLabel
				toggleFunction={toggleExpandDropDown}
				theName={name}
				toggleVariable={expandDropDown}
				labelImg={labelImg}
				noLabelImg={name === 'Employee Information' ? true : false}
				color={color}
			/>
			{expandDropDown && name === 'Employee Information' ? <EmployeeInformationComponent content={content} /> : null}
		</div>
	);
};

export default EmployeeInformationContent;
