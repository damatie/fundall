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
import PositionDetailsTab from '../tabs/positionDetails';
import ApplicantsTab from '../tabs/applicantsTab';
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

const userData = useAuth().getUserData;

const columns = [
	{
			id: 'name',
			align: 'center',
			disablePadding: false,
			label: 'Name',
			sort: true
	},
	{
			id: 'email',
			align: 'center',
			disablePadding: false,
			label: 'Email',
			sort: true
	},
	{
			id: 'phone',
			align: 'center',
			disablePadding: false,
			label: 'Phone number',
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
	
function PositionDetails({ match }, props) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const classes = useStyles(props);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const position = useSelector(({ PositionDetails }) => PositionDetails.recruitment.onePosition);
	const rows = useSelector(({ PositionDetails }) => PositionDetails.candidate.data);

  const [tabValue, setTabValue] = useState(0);
  
  const positionId = match.params.positionId;
	
	useEffect(() => {
		dispatch(Actions.getAllCandidates(positionId));
		dispatch(Actions.getOneOpenPosition(positionId));
	}, [])

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	const isHr = () => userData.role.toUpperCase() === 'HR';

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
								<Icon
									className="text-24 text-black bg-white rounded-20"
									component={Link}
									to="/recruitment"
            			role="button"
								>arrow_back</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
									Position details
								</Typography>
							</FuseAnimate>
						</div>
					</div>

					<div className="flex items-center max-w-full">
						{ isHr() && <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography
									className="text-16 sm:text-20 truncate"
									component={Link}
									to={`/recruitment/add_candidate/${positionId}`}
									role='button'
									variant="contained"
									color="secondary"
								>
									Add New Candidate
								</Typography>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography variant="caption">Create a new applicant</Typography>
							</FuseAnimate>
						</div>}
					</div>
				</div>
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
a					varint="scrollable"
					scrollButtons="off"
					className="w-full border-b-1 px-24"
				>
					<Tab className="text-14 font-600 normal-case" label="Details" />
					<Tab className="text-14 font-600 normal-case" label="List of applicants" />
					<Tab className="text-14 font-600 normal-case" label="Accepted applicants" />
				</Tabs>
			}
			content={
				<div className=" sm:px-24 py-16 ">
					{ tabValue === 0 && (
						<PositionDetailsTab position={position} />
					)}
					{ tabValue === 1 && (
						<ApplicantsTab position={position} columns={columns} rows={rows} />
					)}
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('PositionDetails', reducer)(PositionDetails);
