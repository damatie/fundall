import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Table from '../RecruitmentTable';
import { useAuth } from 'app/hooks/useAuth';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

const columns = [
	{
		id: 'entityName',
		align: 'center',
		disablePadding: false,
		label: 'Entity Name',
		sort: true
	},
	{
		id: 'jobTitle',
		align: 'center',
		disablePadding: false,
		label: 'Job title',
		sort: true
	},
	{
		id: 'employeeStatus',
		align: 'center',
		disablePadding: false,
		label: 'Employee status',
		sort: true
	},
	{
		id: 'urgency',
		align: 'center',
		disablePadding: false,
		label: 'Urgency',
		sort: true
	},
	{
		id: 'createdAt',
		align: 'center',
		disablePadding: false,
		label: 'Created At',
		sort: true
	},
	{
		id: 'status',
		align: 'center',
		disablePadding: false,
		label: 'Status',
		sort: true
	},
	{
		id: 'actions',
		align: 'center',
		disablePadding: false,
		label: 'Actions',
		sort: true
	},
];

function Recruitment(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const rows = useSelector(({ Recruitment }) => Recruitment.recruitment.data);

	const userData = useAuth().getUserData;

	const [search, setSearch] = useState('');
	const [approvedRows, setApprovedRows] = useState([]);
	const [pendingRows, setPendingRows] = useState([]);
	const [closedRow, setClosedRow] = useState([]);
	const [tabValue, setTabValue] = useState(0);

	useEffect(() => {
		dispatch(Actions.getAllOpenPositions());
		dispatch(Actions.getEntities());
	}, [])

	useEffect(() => {
		setApprovedRows(rows.filter(row => row.recruiter !== null));
		setPendingRows(rows.filter(row => row.status === 'pending' || row.status === 'open'));
		setClosedRow(rows.filter(row => row.status === 'closed'));
	}, [rows]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	const isManager = () => userData.role.toUpperCase() === 'LINE MANAGER' || "HR MANAGER";

	return (
		<FusePageSimple
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between px-24">
					<div className="flex flex-col items-start max-w-full">
						<div className="flex items-center">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Icon className="text-32">shopping_basket</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
									List of Opening
								</Typography>
							</FuseAnimate>
						</div>
					</div>

					<div className="flex flex-1 items-center justify-center px-12">
						<ThemeProvider theme={mainTheme}>
							<FuseAnimate animation="transition.slideDownIn" delay={300}>
								<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
									<Icon color="action">search</Icon>
									<Input
										placeholder="Search"
										className="flex flex-1 mx-8"
										disableUnderline
										fullWidth
										value={search}
										inputProps={{
											'aria-label': 'Search'
										}}
										onChange={ev => setSearch(ev.target.value)}
									/>
								</Paper>
							</FuseAnimate>
						</ThemeProvider>
					</div>

					{isManager() &&
						<div className="flex items-center max-w-full">
							<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Button
										className="mb-16"
										component={Link}
										to='/recruitment/create_opening'
										role='button'
										variant="contained"
										color="secondary"
										disableElevation
									>
										Create New Opening
									</Button>
								</FuseAnimate>
							</div>
						</div>
					}
				</div>
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="off"
					className="w-full border-b-1 px-24"
				>
					<Tab className="text-14 font-600 normal-case" label="All Openings" />
					<Tab className="text-14 font-600 normal-case" label="Approved Openings" />
					<Tab className="text-14 font-600 normal-case" label="Pending Openings" />
					<Tab className="text-14 font-600 normal-case" label="Closed Openings" />
				</Tabs>
			}
			content={
				<div className=" sm:px-24 py-16 ">
					{tabValue === 0 && (
						<Table
							columns={columns}
							rows={rows}
							search={search}
						/>
					)}
					{tabValue === 1 && (
						<Table
							columns={columns}
							rows={approvedRows}
							search={search}
						/>
					)}
					{tabValue === 2 && (
						<Table
							columns={columns}
							rows={pendingRows}
							search={search}
						/>
					)}
					{tabValue === 3 && (
						<Table
							columns={columns}
							rows={closedRow}
							search={search}
						/>
					)}
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('Recruitment', reducer)(Recruitment);
