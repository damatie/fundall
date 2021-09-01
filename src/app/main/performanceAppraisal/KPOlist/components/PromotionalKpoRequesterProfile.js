import React from 'react';
import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	avatarDpDiv: {
		border: '3px solid #02ccf2',
		borderRadius: '50%',
		width: 130,
		height: 130,
		padding: 7,
		margin: 'auto'
	},
	avatarDpSize: {
		width: 110,
		height: 110
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '3%'
	},
	rowItem: {
		width: '45%'
	},
	generalRowLabel: {
		color: '#525252',
		fontWeight: 700,
		fontSize: 11
	},
	content: {
		color: '#000000',
		fontWeight: 700,
		fontSize: 18
	},
	btnDiv: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: '10%'
	},
	generalBtn: {
		color: '#ffffff',
		width: '45%'
	},
	approveBtn: {
		backgroundColor: '#19AC4B'
	},
	declineBtn: {
		backgroundColor: '#FA1C1C'
	},
	profileDiv: {
		margin: '5% auto 10% auto',
		width: 'fit-content'
	},
	firstLastName: {
		fontSize: 22,
		fontWeight: 800,
		color: '#000000',
		marginTop: '2%'
	},
	staffId: {
		fontSize: 12,
		color: '#525252',
		fontWeight: 700,
		textAlign: 'center',
		display: 'block',
		marginTop: '1%'
	}
}));

const PromotionalKpoRequesterProfile = ({ userData }) => {
	const classes = useStyles();

	return (
		<>
			<div className={` ${classes.profileDiv}`}>
				{userData?.image ? (
					<div className={` ${classes.avatarDpDiv}`}>
						<Avatar className={` ${classes.avatarDpSize}`} src={userData?.image} alt="profile photo" />
					</div>
				) : (
					<div className={` ${classes.avatarDpDiv}`}>
						<Avatar className={` ${classes.avatarDpSize}`}>{userData?.firstName.charAt(0)}</Avatar>
					</div>
				)}
				<p className={` ${classes.firstLastName}`}>{`${userData.firstName} ${userData.lastName}`}</p>
				<span className={` ${classes.staffId}`}>{userData.staffId}</span>
			</div>
			<div className={` ${classes.generalRow}`}>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Job Title</p>
						<p className={` ${classes.content}`}>{userData.jobTitle}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Employee Email</p>
						<p className={` ${classes.content}`}>{userData.email}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Entity</p>
						<p className={` ${classes.content}`}>{userData.entity}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Department</p>
						<p className={` ${classes.content}`}>{userData.department}</p>
					</div>
				</div>
				<div className={` ${classes.row}`}>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Line Manager</p>
						<p className={` ${classes.content}`}>{userData.lineManager}</p>
					</div>
					<div className={` ${classes.rowItem}`}>
						<p className={` ${classes.generalRowLabel}`}>Reviewing Manager</p>
						<p className={` ${classes.content}`}>{userData.reviewingManager}</p>
					</div>
				</div>
			</div>
			<div className={` ${classes.btnDiv}`}>
				<Button variant="contained" className={` ${classes.approveBtn} ${classes.generalBtn}`}>
					APPROVE{' '}
				</Button>
				<Button variant="contained" className={` ${classes.declineBtn} ${classes.generalBtn}`}>
					DECLINE
				</Button>
			</div>
		</>
	);
};

export default PromotionalKpoRequesterProfile;
