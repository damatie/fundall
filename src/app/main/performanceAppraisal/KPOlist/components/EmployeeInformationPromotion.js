import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	employeeInformationDiv: {
		marginTop: '-2%',
		marginLeft: '35%',

		[theme.breakpoints.down('sm')]: {
			marginTop: '4%',
			marginLeft: '13.5%'
		}
	},
	rowDiv: {
		display: 'flex',
		marginBottom: '6%'
	},
	leftDiv: {
		width: '45%'
	},
	label: {
		color: '#3d3d3d',
		fontWeight: 700,
		fontSize: 12
	},
	content: {
		fontWeight: 700,
		fontSize: 20
	}
}));

const EmployeeInformationPromotion = ({ employeeInformation }) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.employeeInformationDiv}`}>
			<div className={` ${classes.rowDiv}`}>
				<div className={` ${classes.leftDiv}`}>
					<p className={` ${classes.label}`}>Employee Date of Employment</p>
					<p className={` ${classes.content}`}>{employeeInformation.dateOfEmployment}</p>
				</div>
				<div>
					<p className={` ${classes.label}`}>Employee Confirmation Date</p>
					<p className={` ${classes.content}`}>{employeeInformation.dateOfConfirmation}</p>
				</div>
			</div>
			<div className={` ${classes.rowDiv}`}>
				<div className={` ${classes.leftDiv}`}>
					<p className={` ${classes.label}`}>Employee Date of Last Promotion</p>
					<p className={` ${classes.content}`}>{employeeInformation.dateOfLastPromotion}</p>
				</div>
				<div>
					<p className={` ${classes.label}`}>Nature of Engagement</p>
					<p className={` ${classes.content}`}>{employeeInformation.natureOfEngagement}</p>
				</div>
			</div>
			<div>
				<p className={` ${classes.label}`}>Employee Grade</p>
				<p className={` ${classes.content}`}>{employeeInformation.grade}</p>
			</div>
		</div>
	);
};

export default EmployeeInformationPromotion;
