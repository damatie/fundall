import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BlueDot from '../../../../../assets/icons/blue-dot.svg';
import BlackDot from '../../../../../assets/icons/black-dot.svg';

const useStyles = makeStyles(theme => ({
	employeeInformationContentLabel: {
		display: 'flex',
		marginBottom: '10%',
		cursor: 'pointer'
		// backgroundColor: '#ffffff'
	},
	labelImg: {
		width: '6%',
		margin: '0 2%'
	},
	noClicking: {
		pointerEvents: 'none',
		cursor: 'not-allowed',
		backgroundColor: '#F5F5F5',
		padding: 17,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10
	},
	selected: {
		color: '#00CCF2 !important'
	},
	labelText: {
		fontSize: 16,
		fontWeight: 600,
		color: '#3D3D3D',

		[theme.breakpoints.down('sm')]: {
			fontSize: 10
		}
	}
}));

const EmployeeInformationContentLabel = ({
	labelImg,
	labelText,
	showContent,
	setShowContent,
	contentToShow,
	setContentToShow,
	content
}) => {
	const classes = useStyles();
	const showItsContent = () => {
		setShowContent(labelText);
		setContentToShow(content);
	};

	return (
		<div
			className={` ${classes.employeeInformationContentLabel} ${showContent === labelText && classes.noClicking}`}
			onClick={showItsContent}
		>
			<img src={showContent === labelText ? BlueDot : BlackDot} alt="identifier" />
			<img className={` ${classes.labelImg}`} src={labelImg} alt="message icon" />
			<span className={` ${classes.labelText} ${showContent === labelText && classes.selected}`}>{labelText}</span>
		</div>
	);
};

export default EmployeeInformationContentLabel;
