import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import ProgressBtn from 'app/shared/progressBtn';
// import swal from 'sweetalert2';
import withReducer from 'app/store/withReducer';
// import { useDeepCompareEffectNoCheck } from '@fuse/hooks/useDeepCompareEffect';
import SALoanDetailsTab from '../../tabs/salaryAdvanceLoanDetailsTab';
import reducers from '../../store/reducers';
import * as Actions from '../../store/actions';
// import SalaryAdvanceActionBtn from '../salaryAdvanceActionBtn';


const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	}
}));

function LoanDetails(props) {
	const header = fetchHeaders();
	const classes = useStyles();

	const salaryAdvanceDetails = useSelector(({ salaryAdvanceDetails }) => salaryAdvanceDetails.salaryAdvances);

	const [selectedTab, setSelectedTab] = useState(0);

	// const [value, setValue] = useState('')

	// const user = JSON.parse(localStorage.getItem('user_data'));

	const { id } = useParams();

	const theme = useTheme();

	const history = useHistory();

	const dispatch = useDispatch();

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	useEffect(() => {
		dispatch(Actions.getSalaryAdvanceDetails(id));
	}, []);


	if (Object.entries(salaryAdvanceDetails.details).length === 0) return <>Loading...</>

	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			header={
				<>
					<div className="flex absolute m-24">
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Typography
								className="normal-case flex items-center"
								component={Link}
								role="button"
								to="/loan/salary_advance/list"
								color="inherit"
							// onClick={e => history.goBack()}
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">Back</span>
							</Typography>
						</FuseAnimate>
					</div>
					<div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">

						<div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Avatar className="w-96 h-96" src={salaryAdvanceDetails?.details?.employee?.profilePicture} />
							</FuseAnimate>
							<div>
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography className="md:mx-24" variant="h4" color="inherit">
										{`${salaryAdvanceDetails?.details?.data?.salaryAdvanceData?.name}`}
									</Typography>

								</FuseAnimate>
								<Typography className="md:mx-24" variant='subtitle1' color="inherit">
									{salaryAdvanceDetails.details?.data?.employeeInfo?.email}
								</Typography>
							</div>

						</div>
					</div>
				</>
			}
			contentToolbar={
				<Tabs
					value={selectedTab}
					onChange={handleTabChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="off"
					classes={{
						root: 'h-64 w-full border-b-1'
					}}
				>
					<Tab
						classes={{
							root: 'h-64'
						}}
						label="Request Details"
					/>
					{/* {loan.status === 'open' ? <Tab
						classes={{
							root: 'h-64'
						}}
						label="Loan Statement"
					/> : ''} */}
				</Tabs>
			}
			content={
				<div className="p-16 sm:p-24">
					{selectedTab === 0 && <SALoanDetailsTab />}
					{/* {selectedTab === 1 && <LoanStatementTab />} */}
				</div>
			}
		/>
	);
}

export default withReducer('salaryAdvanceDetails', reducers)(LoanDetails);
