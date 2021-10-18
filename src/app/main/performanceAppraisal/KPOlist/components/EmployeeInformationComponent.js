import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	employeeInformationComponentDiv: {
		marginTop: '8.5%',
		paddingLeft: '7%',

		[theme.breakpoints.down('md')]: {
			// marginTop: '1%',
			// marginLeft: '38.5%'
		},

		[theme.breakpoints.down('sm')]: {
			// marginTop: '4%',
			// marginLeft: '13.5%'
		}
	},
	firstRow: {},
	secondRow: {
		marginTop: '5%'
	},
	thirdRow: {
		marginTop: '5%'
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

const EmployeeInformationComponent = ({
	content: {
		title,
		staffId,
		firstName,
		gender,
		middleName,
		surname,
		maritalStatus,
		nickName,
		officialNo,
		officeNo,
		officeExtension,
		privateNo,
		officeEmail,
		alternativeEmail,
		fbHandle,
		linkedInHandle,
		instaHandle,
		twitterHandle
	}
}) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.employeeInformationComponentDiv}`}>
			<div className={` ${classes.firstRow}`}>
				<h3 className={` ${classes.rowHeading}`}>Employee Information</h3>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Title</p>
						<p className={` ${classes.content}`}>{title}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Staff ID</p>
						<p className={` ${classes.content}`}>{staffId}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>First Name</p>
						<p className={` ${classes.content}`}>{firstName}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Gender</p>
						<p className={` ${classes.content}`}>{gender}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Middle Name</p>
						<p className={` ${classes.content}`}>{middleName}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Marital Status</p>
						<p className={` ${classes.content}`}>{maritalStatus}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Surname</p>
						<p className={` ${classes.content}`}>{surname}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.firstRowLabel}`}>Nick Name</p>
						<p className={` ${classes.content}`}>{nickName}</p>
					</div>
				</div>
			</div>
			<div className={` ${classes.secondRow}`}>
				<h3 className={` ${classes.rowHeading}`}>Telephone Numbers</h3>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Official Mobile No.</p>
						<p className={` ${classes.content}`}>{officialNo}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Office Telephone Line</p>
						<p className={` ${classes.content}`}>{officeNo}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Office Extension</p>
						<p className={` ${classes.content}`}>{officeExtension}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Private Mobile Number</p>
						<p className={` ${classes.content}`}>{privateNo}</p>
					</div>
				</div>
			</div>
			<div className={` ${classes.thirdRow}`}>
				<h3 className={` ${classes.rowHeading}`}>Email</h3>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Office Email</p>
						<p className={` ${classes.content}`}>{officeEmail}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Alternative Email</p>
						<p className={` ${classes.content}`}>{alternativeEmail}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Facebook Handle </p>
						<p className={` ${classes.content}`}>{fbHandle}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>LinkedIn Handle </p>
						<p className={` ${classes.content}`}>{linkedInHandle}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Instagram Handle</p>
						<p className={` ${classes.content}`}>{instaHandle}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Twitter Handle</p>
						<p className={` ${classes.content}`}>{twitterHandle}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmployeeInformationComponent;
