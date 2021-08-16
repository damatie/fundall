import React from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
// import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	avatarDpDiv: {
		border: '3px solid #02ccf2',
		borderRadius: '50%',
		width: 170,
		height: 170,
		padding: 7
	},
	avatarDpSize: {
		width: 150,
		height: 150
	},
	mainDiv: {
		width: '60%',
		margin: 'auto',
		display: 'flex',
		alignItems: 'center'
	},
	profileInfoDiv: {
		color: '#000000',
		marginLeft: '5%',

		[theme.breakpoints.down('xs')]: {
			marginLeft: 0
		}
	},
	userName: {
		fontWeight: 700,
		fontSize: 30
	},
	email: {
		fontWeight: 600,
		fontSize: 15
	},
	jobTitle: {
		fontWeight: 700,
		fontSize: 17
	},
	companyAndDept: {
		display: 'flex',
		fontWeight: 600,
		fontSize: 11
	} /* ,
	companyName: {
		fontSize: 10
	},
	department: {
		fontSize: 11
	} */,
	pipe: {
		display: 'inline-block',
		margin: '0 3%'
	}
}));

const PromotionalKpoEmployeeProfile = ({ userData }) => {
	const classes = useStyles();

	return (
		<>
			<Grid container direction="row" className={` ${classes.mainDiv}`}>
				<Grid item className={``}>
					{userData?.image ? (
						<div className={` ${classes.avatarDpDiv}`}>
							<Avatar className={` ${classes.avatarDpSize}`} src={userData?.image} alt="profile photo" />
						</div>
					) : (
						<div className={` ${classes.avatarDpDiv}`}>
							<Avatar className={` ${classes.avatarDpSize}`}>{userData?.firstName.charAt(0)}</Avatar>
						</div>
					)}
				</Grid>
				<Grid item className={` ${classes.profileInfoDiv}`}>
					<Typography variant="body1" display="block" className={` ${classes.userName}`}>
						{userData.firstName} &nbsp; {userData.lastName}
					</Typography>
					<Typography variant="body1" display="block" className={` ${classes.email}`}>
						{userData.email}
					</Typography>
					<Typography variant="body1" display="block" className={` ${classes.jobTitle}`}>
						{userData.jobTitle}
					</Typography>
					<Typography variant="body1" display="block" className={` ${classes.companyAndDept}`}>
						<span className={` ${classes.companyName}`}>{userData.companyName}</span>
						<span className={` ${classes.pipe}`}>|</span>
						<span className={` ${classes.department}`}>{userData.department}</span>
					</Typography>
				</Grid>
			</Grid>
		</>
	);
};

export default PromotionalKpoEmployeeProfile;
