import { Avatar, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		//   display: 'flex',
		//   '& > *': {
		// 	margin: theme.spacing(1),
		//   },
	},
	avatarDpDiv: {
		border: '3px solid #02ccf2',
		borderRadius: '50%',
		width: 170,
		height: 170,
		padding: 7,

		[theme.breakpoints.down('xs')]: {
			width: 110,
			border: '2px solid #02ccf2',
			height: '110px',
			padding: 3
		}
	},
	avatarDpSize: {
		width: 150,
		height: 150,

		[theme.breakpoints.down('xs')]: {
			width: 100,
			height: 100
		}
	},
	theCaptions: {
		fontWeight: '600',
		color: '#757575',
		fontSize: '1.2rem',

		[theme.breakpoints.down('xs')]: {
			fontSize: '1.1rem'
		}
	},
	employeeDetailsGrid: {
		marginTop: '5%',
		paddingLeft: '5%',
		width: '50%',
		marginBottom: '5%',

		[theme.breakpoints.down('sm')]: {
			width: '80%'
		},

		[theme.breakpoints.down('sm')]: {
			width: '95%'
		}
	},
	employeeDetailsGridItem: {
		width: '50%',

		[theme.breakpoints.down('sm')]: {
			wordBreak: 'break-word'
		}
	},
	firstRow: {
		height: 170,
		marginBottom: '25%',

		[theme.breakpoints.down('xs')]: {
			height: 110,
			marginBottom: '15%'
		}
	},
	secondAndThirdRow: {
		// height: 100
		marginBottom: '10%'
	},
	secondAndThirdRowContent: {
		fontSize: '2.1rem',
		fontWeight: '700',

		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	employeeNameDiv: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	employeeName: {
		fontSize: '3.5rem',
		fontWeight: '700',

		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem'
		}
	},
	employeeEmail: {
		color: '#12cff3',
		fontSize: '2.2rem',

		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	employeeJobTitle: {
		fontSize: '1.9rem',

		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	}
}));

const KpoDetailEmployeeInfo = ({ customHook }) => {
	const userData = useSelector(state => state.auth.user.data);
	const { details, loadingSingleKpo } = customHook;

	const classes = useStyles();

	// useEffect(() => console.log(userData, 'the userData from the kpodetailemployeeinfo'), [userData]);
	// useEffect(() => console.log(customHook, 'the customHook from the kpodetailemployeeinfo'), [customHook]);
	// useEffect(() => console.log(loadingSingleKpo, 'the loadingSingleKpo from the kpodetailemployeeinfo'), [customHook]);
	// useEffect(() => console.log(details, 'the details from the kpodetailemployeeinfo'), [customHook]);

	const customDetails = {
		// REMOVE this customDetails object
		employee: {
			firstName: 'Andrea',
			lastName: 'Jones',
			email: 'employee@cbitindustries.com',
			jobTitle: {
				name: 'Software Dev'
			}
		},
		entity: {
			entityName: 'IT'
		},
		lineManager: {
			firstName: 'Boss',
			lastName: 'Manager'
		},
		department: {
			departmentName: 'CBIT'
		},
		reviewingManager: {
			lastName: 'Tommy',
			firstName: 'Shelby'
		}
	};

	// REMOVE all occurence of customDetails to details?

	return (
		<>
			{!loadingSingleKpo ? (
				<Skeleton animation="wave" width="100%" height="350px" variant="rect" />
			) : (
				<>
					<Grid
						container
						direction="row"
						/* justifyContent="space-between"  */ className={` ${classes.employeeDetailsGrid}`}
						// spacing={3}
					>
						<Grid
							container
							item
							direction="column"
							className={` ${classes.employeeDetailsGridItem}`} /* xs={12} sm={5} md={3} lg={5} xl={3} */
						>
							<Grid item className={` ${classes.firstRow}`}>
								{userData?.photoURL ? (
									<div className={` ${classes.avatarDpDiv}`}>
										<Avatar className={` ${classes.avatarDpSize}`} src={userData?.photoURL} alt="profile photo" />
									</div>
								) : (
									<div className={` ${classes.avatarDpDiv}`}>
										<Avatar className={` ${classes.avatarDpSize}`}>
											{customDetails.employee?.firstName.charAt(0)}
										</Avatar>
									</div>
								)}
							</Grid>
							<Grid item className={` ${classes.secondAndThirdRow}`}>
								<Typography variant="caption" display="block" className={` ${classes.theCaptions}`}>
									Entity
								</Typography>
								<Typography variant="subtitle1" className={` ${classes.secondAndThirdRowContent}`}>
									{customDetails.entity?.entityName}
								</Typography>
							</Grid>
							<Grid item className={` ${classes.secondAndThirdRow}`}>
								<Typography variant="caption" display="block" className={` ${classes.theCaptions}`}>
									Line Manager
								</Typography>
								<Typography variant="subtitle1" className={` ${classes.secondAndThirdRowContent}`}>
									{`${customDetails.lineManager?.firstName} ${customDetails.lineManager?.lastName}`}
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							item
							direction="column"
							className={` ${classes.employeeDetailsGridItem}`} /* xs={12} sm={5} md={3} lg={5} xl={3} */
						>
							<Grid item className={` ${classes.firstRow} ${classes.employeeNameDiv}`}>
								<Typography variant="h2" className={` ${classes.employeeName}`} gutterBottom>
									{`${customDetails.employee?.firstName} ${customDetails.employee?.lastName}`}
								</Typography>
								<Typography variant="subtitle2" className={` ${classes.employeeEmail}`}>
									{customDetails.employee?.email}
								</Typography>
								<Typography variant="subtitle2" className={` ${classes.employeeJobTitle}`}>
									{customDetails.jobTitle?.name}
								</Typography>
							</Grid>
							<Grid item className={` ${classes.secondAndThirdRow}`}>
								<Typography variant="caption" display="block" className={` ${classes.theCaptions}`}>
									Department
								</Typography>
								<Typography variant="subtitle1" className={` ${classes.secondAndThirdRowContent}`}>
									{customDetails.department?.departmentName}
								</Typography>
							</Grid>
							<Grid item className={` ${classes.secondAndThirdRow}`}>
								<Typography variant="caption" display="block" className={` ${classes.theCaptions}`}>
									Reviewing Manager
								</Typography>
								<Typography variant="subtitle1" className={` ${classes.secondAndThirdRowContent}`}>
									{`${customDetails.reviewingManager?.firstName} ${customDetails.reviewingManager?.lastName}`}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};

export default KpoDetailEmployeeInfo;
