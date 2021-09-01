import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	employeeInformationComponentDiv: {
		marginTop: '8.5%',
		paddingLeft: '7%',

		[theme.breakpoints.down('md')]: {
			// marginTop: '1%',
			// marginLeft: '38.5%'
		}
	},
	row: {
		display: 'flex',
		marginBottom: '3%'
	},
	rowItem: {
		width: '40%'
	},
	firstRowLabel: {
		color: '#3D3D3D',
		fontWeight: 700,
		fontSize: 12,

		[theme.breakpoints.down('sm')]: {
			fontSize: 8
		}
	},
	generalRowLabel: {
		color: '#525252',
		fontWeight: 700,
		fontSize: 12,

		[theme.breakpoints.down('sm')]: {
			fontSize: 8
		}
	},
	content: {
		color: '#000000',
		fontWeight: 700,
		fontSize: 20,

		[theme.breakpoints.down('sm')]: {
			fontSize: 10
		}
	},
	rowHeading: {
		color: '#525252',
		fontWeight: 600,
		fontSize: 15,
		marginBottom: '3%',
		position: 'relative',
		paddingBottom: 5,

		[theme.breakpoints.down('sm')]: {
			fontSize: 13
		},

		'&:after': {
			content: "' '",
			position: 'absolute',
			width: '60%',
			height: 4,
			backgroundColor: '#00CCF2',
			bottom: 0,
			left: 0
		}
	}
}));

const GradeEmployeeInformationContent = ({
	content: { employeeGrade, natureOfEngagement, confirmationDate, dateOfEmployment, dateOfLastPromotion }
}) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.employeeInformationComponentDiv}`}>
			<div className={` ${classes.firstRow}`}>
				<h3 className={` ${classes.rowHeading}`}>Employee Information</h3>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Employee Grade</p>
						<p className={` ${classes.content}`}>{employeeGrade}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Nature of Engagement</p>
						<p className={` ${classes.content}`}>{natureOfEngagement}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Employee Confirmation Date</p>
						<p className={` ${classes.content}`}>{confirmationDate}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Employee Date of Employment</p>
						<p className={` ${classes.content}`}>{dateOfEmployment}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Employee Date of Last Promotion</p>
						<p className={` ${classes.content}`}>{dateOfLastPromotion}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GradeEmployeeInformationContent;
