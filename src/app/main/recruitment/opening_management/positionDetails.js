import FuseAnimate from '@fuse/core/FuseAnimate';
// import FuseChipSelect from '@fuse/core/FuseChipSelect';
// import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
// import { useForm, useDeepCompareEffect } from '@fuse/hooks';
// import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
// import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import Input from '@material-ui/core/Input';
// import Paper from '@material-ui/core/Paper';
import withReducer from 'app/store/withReducer';
// import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// import { ThemeProvider } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import PositionDetailsTab from '../tabs/positionDetails';
import ApplicantsTab from '../tabs/applicantsTab';
import { useAuth } from 'app/hooks/useAuth';
import ProgressBtn from 'app/shared/progressBtn';
import RecruitmentDialog from '../RecruitmentDialog';
import { Slide } from '@material-ui/core';
import UpdatePositionTab from '../tabs/updatePositionTab';

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
	const position = useSelector(({ PositionDetails }) => PositionDetails.recruitment.onePosition);
	const rows = useSelector(({ PositionDetails }) => PositionDetails.candidate.data);
	const [update, setUpdate] = useState(false);

	const [tabValue, setTabValue] = useState(0);

	const positionId = match.params.positionId;

	useEffect(() => {
		dispatch(Actions.getAllCandidates(positionId));
		dispatch(Actions.getOneOpenPosition(positionId));
		dispatch(Actions.getEntities());
	}, [])

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="right" ref={ref} {...props} />;
	});

	const isHr = () => userData.role.toUpperCase() === 'HR MANAGER';

	const { loading, close } = useSelector(state => state.PositionDetails.recruitment)

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
									to="/recruitment/all"
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

					{/* Update Dialog */}
					<RecruitmentDialog
						open={update}
						transition={Transition}
						title='Update Opening'
						onClose={value => setUpdate(false)}
					>
						<UpdatePositionTab setUpdateOpen={update} selectedPosition={position} />
					</RecruitmentDialog>

					<div className="flex items-center max-w-full">
						<Button
							className="mb-16 mr-10"
							// component={Link}
							role='button'
							variant="contained"
							color="primary"
							onClick={() => setUpdate(true)}
						// to={`/recruitment/add_candidate/${positionId}`}
						>
							Update Details
						</Button>

						{isHr() &&
							<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									{
										(position.status !== 'sent to hr' || position.status !== 'closed') ?
											<Button
												className="mb-16"
												component={Link}
												role='button'
												variant="contained"
												color="secondary"
												to={`/recruitment/add_candidate/${positionId}`}
											>
												Add New Candidate
											</Button> :
											<ProgressBtn success={close} loading={loading} color='red' content='Close Position' onClick={e => dispatch(Actions.closeOpening(positionId))} />
									}
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
					variant="scrollable"
					scrollButtons="off"
					className="w-full border-b-1 px-24"
				>
					<Tab className="text-14 font-600 normal-case" label="Details" />
					<Tab className="text-14 font-600 normal-case" label="List of applicants" />

					{/* <Tab className="text-14 font-600 normal-case" label="Accepted applicants" /> */}
				</Tabs>
			}
			content={
				<div className=" sm:px-24 py-16 ">
					{tabValue === 0 && (
						<PositionDetailsTab position={position} />
					)}
					{tabValue === 1 && (
						<ApplicantsTab position={position} columns={columns} rows={rows} />
					)}
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('PositionDetails', reducer)(PositionDetails);
