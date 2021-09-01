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
		// marginLeft: '9%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		// [theme.breakpoints.down('md')]: {
		// 	marginLeft: '7%'
		// },

		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
			flexDirection: 'column'
		}
	},
	profileInfoDiv: {
		marginLeft: '5%',
		border: '1px solid #DAD5D5',
		borderRadius: 10,
		position: 'relative',
		width: '65%',
		padding: '10px 0 10px 30px',

		[theme.breakpoints.down('sm')]: {
			width: '90%',
			margin: 'auto',
			marginTop: '5%'
		},

		[theme.breakpoints.down('xs')]: {
			marginLeft: '3%',
			padding: '5px 0 5px 20px'
		}
	},
	profileInfoItem: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '2%'
	},
	profileInfoLabel: {
		fontWeight: 600,
		fontSize: 15,
		color: '#3D3D3D',
		width: '30%',

		[theme.breakpoints.down('sm')]: {
			fontSize: 12
		}
	},
	profileInfoContent: {
		fontWeight: 600,
		fontSize: 18,
		width: '60%',
		color: '#000000',

		[theme.breakpoints.down('sm')]: {
			fontSize: 15
		}
	},
	userName: {
		fontWeight: 700,
		fontSize: 25,

		[theme.breakpoints.down('sm')]: {
			fontSize: 20
		}
	},
	email: {
		color: '#00CCF2',
		fontSize: 20,

		[theme.breakpoints.down('sm')]: {
			fontSize: 16
		}
	},
	hrClass: {
		width: 2,
		height: '83%',
		top: '7%',
		left: '28%',
		position: 'absolute',
		background: '#ECEAEA',

		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
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
					<div className={` ${classes.profileInfoItem}`}>
						<p className={` ${classes.profileInfoLabel}`}>Name</p>
						<p className={` ${classes.userName}`}>
							{userData.firstName} &nbsp; {userData.lastName}
						</p>
					</div>
					<div className={` ${classes.profileInfoItem}`}>
						<p className={` ${classes.profileInfoLabel}`}>Email Address</p>
						<p className={` ${classes.profileInfoContent} ${classes.email}`}>{userData.email}</p>
					</div>
					<div className={` ${classes.profileInfoItem}`}>
						<p className={` ${classes.profileInfoLabel}`}>Entity</p>
						<p className={` ${classes.profileInfoContent}`}>{userData.companyName}</p>
					</div>
					<div className={` ${classes.profileInfoItem}`}>
						<p className={` ${classes.profileInfoLabel}`}>Department</p>
						<p className={` ${classes.profileInfoContent}`}>{userData.department}</p>
					</div>
					<div className={` ${classes.profileInfoItem}`}>
						<p className={` ${classes.profileInfoLabel}`}>Job Role</p>
						<p className={` ${classes.profileInfoContent}`}>{userData.jobTitle}</p>
					</div>
					<hr className={` ${classes.hrClass}`} />
				</Grid>
			</Grid>
		</>
	);
};

export default PromotionalKpoEmployeeProfile;
