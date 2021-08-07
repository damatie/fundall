import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import GridSystem from 'app/shared/gridSystem';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
		overflowY: 'scroll',
		flexDirection: 'column',
		margin: '0rem auto',
		padding: '5rem',
		'& form': {
			width: '100%'
		}
	},
	openingDetailLabel: {
		fontWeight: 600,
		fontSize: 12,
		// lineHeight: 15,
		color: '#6F6F6F',

		[theme.breakpoints.down('xs')]: {
			fontSize: 10
		}
	},
	openingDetailContent: {
		fontWeight: 600,
		fontSize: 14,
		// lineHeight: 20,
		textAlign: 'justify',
		color: '#000000',

		[theme.breakpoints.down('xs')]: {
			fontSize: 11
		}
	}
}));

const UpdateButton = withStyles(theme => ({
	root: {
		color: '#000000',
		backgroundColor: '#62DAFC',
		'&:hover': {
			backgroundColor: '#62DAFC'
		}
	}
}))(Button);

export default function OpeningContentCard({ contentList, handleEditList }) {
	const classes = useStyles();
	
	return (
		contentList.length > 0 && contentList.sort((a, b)=> (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).map((content) => {
			return (
			<div>
				<Box
					boxShadow={3}
					bgcolor="background.paper"
					p={0}
					style={{ borderRadius: '15px', marginTop: '25px', marginBottom: '25px' }}
					key={content?.id}
				>
					<Grid
						container
						spacing={0}
						direction="row"
						align="left"
						className="flex-row"
						style={{ borderRadius: '15px' }}
					>
						<Grid
							item
							lg={1}
							md={1}
							sm={1}
							xs={1}
							align="center"
							className="text-center py-auto"
							style={{
								borderTopLeftRadius: '15px',
								borderBottomLeftRadius: '15px',
								color: '#fff',
								backgroundColor: '#192d3e',
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							<Typography
								variant="h5"
								color="initial"
								className="text-center py-auto"
								style={{ alignSelf: 'center' }}
							>
								{`0${content?.id}`}
							</Typography>
						</Grid>
						<Grid item lg={11} md={11} sm={11} xs={11}>
							<Grid container spacing={3} style={{ padding: '20px' }}>
								<Grid item lg={10} md={10} sm={10} xs={10} align="left" className="">
									<GridSystem>
										<div>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
												Entity
											</Typography>
											<Typography
												variant="body2"
												color="initial"
												style={{ textTransform: 'uppercase' }}
												className={` my-6 ${classes.openingDetailContent}`}
											>
												{content?.entityName}
											</Typography>
										</div>
										<div>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
												Department
											</Typography>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
												{content?.departmentName}
											</Typography>
										</div>

									</GridSystem>
								</Grid>
								<Grid item lg={2} md={2} sm={2} xs={2} align="left" className="my-10">
									
										<Button
											onClick={() => {
												handleEditList(content?.id);
											}}
											variant="contained"
										>
											<span style={{ marginRight: '5px' }}>
												<EditIcon />
											</span>{' '}
											Edit
										</Button>
								</Grid>
								<Grid item lg={10} md={10} sm={10} xs={10} align="left" className="">
									<GridSystem>
										<div>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
												Employee Grade
											</Typography>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
												{content?.employeeGrade}
											</Typography>
										</div>
										<div>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
												Job Role
											</Typography>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
												{content?.jobRoleName}
											</Typography>
										</div>
									</GridSystem>
									<div>
										<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
											Job Description
										</Typography>
										<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
											{<span dangerouslySetInnerHTML={{ __html: content?.jobDescription.substr(0, 500) +'...'}} />}
										</Typography>
									</div>
									{!(content?.openingType === 'National Service'  || content?.openingType === 'Industrial Training') && (
										<GridSystem>
											<div>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Opening Type
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.openingType}
												</Typography>
											</div>
											{content?.openingType === 'Replacement' && (
												<div>
													<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
														Employee to be replaced
													</Typography>
													<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
														{content?.employeeName}
													</Typography>
												</div>
											)}
											<div>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Position Type
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.positionType}
												</Typography>
											</div>
											<div>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Urgency
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.urgency}
												</Typography>
											</div>
											<div>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Desired Hire Date
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.hireDate}
												</Typography>
											</div>
										</GridSystem>
									)}

									{(content?.openingType === 'National Service'  || content?.openingType === 'Industrial Training') && (
										<GridSystem>
											<div>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Opening Type
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.openingType}
												</Typography>
											</div>
											<div>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Duration
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.duration}
												</Typography>
											</div>
											<div>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Urgency
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.urgency}
												</Typography>
											</div>
											<div>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Desired Hire Date
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.hireDate}
												</Typography>
											</div>
											<div>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Start Date
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.startDate}
												</Typography>
											</div>
											<div>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													End Date
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.endDate}
												</Typography>
											</div>
											<div>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
													Position Type
												</Typography>
												<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
													{content?.positionType}
												</Typography>
											</div>
										</GridSystem>
									)}
									<GridSystem>
										<div>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
												Country
											</Typography>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
												{content?.countryName}
											</Typography>
										</div>
										<div>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailLabel}`}>
												State
											</Typography>
											<Typography variant="body2" color="initial" className={` my-6 ${classes.openingDetailContent}`}>
												{content?.stateId}
											</Typography>
										</div>
									</GridSystem>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</div>
		)})
	);
}

// withReducer('kpoCategory', kpoCategoryReducer)(OpeningContentCard);
