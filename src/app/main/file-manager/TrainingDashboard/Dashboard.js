import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import CardWidget from 'app/shared/widgets/CardWidget';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import { MenuItem, Paper } from '@material-ui/core';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import { formatToNaira } from 'utils/formatNumber';


const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	},
	pagination: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '32px',
		marginTop: '30px'
	},
	previousBtn: {
		marginBottom: 10,
		alignSelf: 'left',
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
		color: 'white',
		fontSize: 20
	},
}));

function FinanceManagerDashboard(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const classes = useStyles(props);

	const data = [
		{
			id: 1,
			department: 'Organizational Integrity',
			entity: '5cee',
			total_cost: formatToNaira(18983000),
			status: 'Active'
		},
		{
			id: 2,
			department: 'Organizational Integrity',
			entity: 'CBit',
			total_cost: formatToNaira(1000000),
			status: 'Active'
		},
		{
			id: 3,
			department: 'Oil and Gas',
			entity: 'Springrock',
			total_cost: formatToNaira(1350000),
			status: 'Inactive'
		},
		{
			id: 4,
			department: 'Doctor',
			entity: '5cee',
			total_cost: formatToNaira(18000000),
			status: 'Active'
		},
		{
			id: 5,
			department: 'Organizational Integrity',
			entity: '5cee',
			total_cost: formatToNaira(8300),
			status: 'Inactive'
		}
	];

	const columns = React.useMemo(
		() => [
			{
				Header: 'S/N',
				accessor: "id",
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Department',
				accessor: 'department',
				sortable: true
			},
			{
				Header: 'Entity',
				accessor: 'entity',
				sortable: true
			},
			{
				Header: 'Total Cost',
				accessor: 'total_cost',
				sortable: false
			},
		],
	);

	const goToPreviousRoute = () => {
		window.location = '/training/personal';
	}

	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-col flex-auto flex-shrink-0 w-full">
				<div
					className={clsx(
						classes.header,
						'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-100 sm:h-188'
					)}
				>
					<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
						<Typography color="inherit" className="text-24 sm:text-40 font-light">
							FINANCE MANAGER TRAINING DASHBOARD
						</Typography>
					</FuseAnimate>
					<Icon className={classes.headerIcon}> school </Icon>
				</div>
				<div className={classes.header}>
					<IconButton className={classes.previousBtn} aria-label="go back" component="span" onClick={goToPreviousRoute}>
						<ArrowBackIcon />
					</IconButton>
				</div>

				<div className="p-12 mt-24">
					<FuseAnimateGroup
						className="flex-column"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						<div className="widget flex flex-wrap w-full">
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={900} title={"Total Approved Trainings"} color="blue" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<CardWidget count={83} title={"Total Upcoming Trainings"} color="orange" />
							</div>
							<div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12 items-align-end">
								<CardWidget count={formatToNaira(900000)} title={"Total Cost of Trainings"} color="green" />
							</div>
						</div>
						<Paper className="widget p-24 m-10 mr-24" style={{ width: "98.5%" }}>

							<Typography color="inherit" variant="subtitle1" className="text-center mb-24">Cost of Trainings per Department</Typography>
							<div className="w-50 flex mb-24">
								<div className={"mr-24"}>
									<SelectTextField
										value={2019}
										size='small'
										label='Year'
									>
										{[2019, 2020].map(item => (
											<MenuItem value={item}>
												{item}
											</MenuItem>
										))}
									</SelectTextField>
								</div>
								<div className={"mr-24"}>
									<SelectTextField
										value={"IT", "Finance", "Software"}
										size='small'
										label='Department'
									>
										{["IT", "Finance", "Software"].map(item => (
											<MenuItem value={item}>
												{item}
											</MenuItem>
										))}
									</SelectTextField>
								</div>
								<div className="w-25">
									<SelectTextField
										value={"5C", "CBit", "SpringRock"}
										size='small'
										label='Entity'
									>
										{["5C", "CBit", "SpringRock"].map(item => (
											<MenuItem value={item}>
												{item}
											</MenuItem>
										))}
									</SelectTextField>
								</div>
							</div>

							<EnhancedTable
								columns={columns}
								data={data}
								selectAll={(value) => console.log(value)}
							/>

						</Paper>

					</FuseAnimateGroup>
				</div>
			</div>
		</ThemeProvider >
	);
}

export default withReducer('personalTraining', null)(FinanceManagerDashboard);
