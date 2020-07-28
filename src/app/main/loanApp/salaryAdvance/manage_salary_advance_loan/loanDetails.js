import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import ProgressBtn from 'app/shared/progressBtn';
import swal from 'sweetalert2';
import withReducer from 'app/store/withReducer';
import { useDeepCompareEffectNoCheck } from '@fuse/hooks/useDeepCompareEffect';
import SALoanDetailsTab from '../../tabs/salaryAdvanceLoanDetailsTab';
import reducers from '../../store/reducers';
import * as Actions from '../../store/actions';


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

	const salaryAdvanceDetails = useSelector(({salaryAdvanceDetails}) => salaryAdvanceDetails.salaryAdvances);

	const [selectedTab, setSelectedTab] = useState(0);
	const [success1, setSuccess1] = useState(false);
	const [loading1, setLoading1] = useState(false);

	const [success2, setSuccess2] = useState(false);
	const [loading2, setLoading2] = useState(false);

	const [success3, setSuccess3] = useState(false);
	const [loading3, setLoading3] = useState(false);

	const [value, setValue] = useState('')

	const user = JSON.parse(localStorage.getItem('user_data'));

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

	const approve = url => {
		fetch(`${url}${id}`, {
			...header.reqHeader(
				'PATCH',
				{
					// amountApproved: 20000
				}
			),
		}).then(res => res.json()).then(
			data => {
				
				if(data.success) {
					setSuccess3(true);
					swal.fire({
						title: 'Approve Salary Advance  ',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					history.push({
						pathname: '/loan/review/salaryadvance/list'
					})
				} else {
					swal.fire({
						title: 'Approve Salary Advance  ',
						text: data.message,
						icon: 'error',
						timer: 3000
					})
					setSuccess3(true);
				}
			}
		).catch(e => {
			setLoading3(false);
			console.error(e)});
	}

	const reject = url => {
		setLoading2(true);
		fetch(`${url}${id}`, {
			...header.delHeader()
		}).then(res => res.json()).then(
			data => {
				setLoading2(false);
				if(data.success) {
					swal.fire({
						title: 'Reject Loan',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess2(true);
					history.push({
						pathname: '/loan/review/list'
					})
				} else {
					swal.fire({
						title: 'Reject Loan',
						text: data.message,
						icon: 'error',
						timer: 3000
					})
					setSuccess2(true);
				}
			}
		).catch(e => {
			setLoading2(false);
			console.error(e)});
	}

	const handleApproveLeave = () => {
		switch(salaryAdvanceDetails.details.status) {
			case 'pending': {
				approve('https://hris-cbit.herokuapp.com/api/v1/salary-advance/approve/hod/');
				break;
			}
			case 'reviewed': {
				approve('https://hris-cbit.herokuapp.com/api/v1/salary-advance/approve/hr/');
				break;
			}
			case 'approved': {
				approve('https://hris-cbit.herokuapp.com/api/v1/salary-advance/approve/finance/');
				break;
			}
			default: {
				return 'hello';
			}
		}
  };
  
	const handleReject = () => {
		switch(salaryAdvanceDetails.details.status) {
			case 'pending': {
				reject('https://hris-cbit.herokuapp.com/api/v1/salary-advance/hod/reject/');
				break;
			}
			case 'reviewed': {
				reject('https://hris-cbit.herokuapp.com/api/v1/salary-advance/hr/reject/');
				break;
			}
			case 'approved': {
				reject('https://hris-cbit.herokuapp.com/api/v1/salary-advance/finance/reject/');
				break;
			}
			default: {
				return 'hello';
			}
		}
	}

	const closeLoan = () => {
		setLoading2(true);
		fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/approve/close/${id}`, {
			...header.reqHeader(
				'PATCH',
				{
					
				}
			)
		}).then(res => res.json()).then(
			data => {
				setLoading2(false);
				if(data.success) {
					swal.fire({
						title: 'Close Loan',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess2(true);
					history.push({
						pathname: '/loan/review/list'
					})
				} else {
					swal.fire({
						title: 'Close Loan',
						text: data.message,
						icon: 'error',
						timer: 3000
					})
					setSuccess2(true);
				}
			}
		).catch(e => {
			setLoading2(false);
			console.error(e)});
	}

	if(salaryAdvanceDetails.loadingDetails) return <>Loading...</>

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
									// to="/hr/business_unit/"
									color="inherit"
									onClick={e => history.goBack()}
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
							<Avatar className="w-96 h-96" src="assets/images/avatars/Velazquez.jpg" />
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="md:mx-24" variant="h4" color="inherit">
								{`${salaryAdvanceDetails.details.firstName} ${salaryAdvanceDetails.details.lastName}`}
							</Typography>
						</FuseAnimate>
					</div>
					<div className="flex items-center justify-end">
						{salaryAdvanceDetails.details.status !== 'open' && salaryAdvanceDetails.details.status !== 'closed' ? 
						<>
							<ProgressBtn loading={loading3} success={success3} color='primary' onClick={handleApproveLeave} content='Approve Loan'/> 
							<ProgressBtn loading={loading2} success={success2} color='secondary' onClick={handleReject} content='Reject Loan' /> 
						</>
						: <></>}

						{salaryAdvanceDetails.details.status === 'open' ? 
						<>
							{/* <ProgressBtn loading={loading3} success={success3} color='primary' onClick={generateLoanStatement} content='Loan statement'/>  */}
							<ProgressBtn loading={loading2} success={success2} color='secondary' onClick={closeLoan} content='Close Loan' /> 
						</> :
						<></>
						}
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
						label="Loan details"
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
