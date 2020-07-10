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
import LoanDetailsTab from '../tabs/loanDetailsTab';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';


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
	const [selectedTab, setSelectedTab] = useState(0);
	const [success1, setSuccess1] = useState(false);
	const [loading1, setLoading1] = useState(false);

	const [success2, setSuccess2] = useState(false);
	const [loading2, setLoading2] = useState(false);

	const [success3, setSuccess3] = useState(false);
	const [loading3, setLoading3] = useState(false);

	const loan = useSelector(({ loan }) => loan.loan.data)

	const { id } = useParams();

	const theme = useTheme();

	const history = useHistory();

	const dispatch = useDispatch();

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	useEffect(() => {
		dispatch(Actions.getLoan(id))
		return () => {
			window.location.reload();
		}
	}, [dispatch])

	const handleApproveLeave = () => {
		setLoading3(true);
		fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/approve/hr/${id}`, {
			...header.reqHeader(
				'patch',
				{
					hello: 'hi'
				}
			),
		}).then(res => res.json()).then(
			data => {
				setLoading3(false);
				if(data.success) {
					swal.fire({
						title: 'Approve Loan',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess3(true);
				} else {
					swal.fire({
						title: 'Approve Loan  ',
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
  };
  

	const handleReject = () => {
		setLoading2(true);
		fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/${id}`, {
			...header.delHeader()
		}).then(res => res.json()).then(
			data => {
				setLoading2(false);
				if(data.message === 'Loan request has been cancelled and deleted') {
					swal.fire({
						title: 'Approve leave',
						text: data.message,
						icon: 'success',
						timer: 3000
					})
					setSuccess2(true);
					// history.push({
					// 	pathname: '/hr/loan/loan_management/'
					// })
				} else {
					swal.fire({
						title: 'Approve leave',
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

	if(success2) {
		return (
			<Redirect to='/hr/loan/loan_management/' />
		)
	}

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
								{/* {`${loan.employee.firstName} ${loan.employee.lastName}`} */}
							</Typography>
						</FuseAnimate>
					</div>

					{loan.status !== 'approved' ? <div className="flex items-center justify-end">
					<ProgressBtn loading={loading3} success={success3} color='primary' onClick={handleApproveLeave} content='Approve Loan'/> 
					<ProgressBtn loading={loading2} success={success2} color='secondary' onClick={handleReject} content='Reject Loan' />
					</div> : <></>}
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
					{/* <Tab
						classes={{
							root: 'h-64'
						}}
						label="About"
					/>
					<Tab
						classes={{
							root: 'h-64'
						}}
						label="Photos & Videos"
					/> */}
				</Tabs>
			}
			content={
				<div className="p-16 sm:p-24">
					{selectedTab === 0 && <LoanDetailsTab />}
					{/* {selectedTab === 1 && <AboutTab />}
					{selectedTab === 2 && <PhotosVideosTab />} */}
				</div>
			}
		/>
	);
}

export default withReducer('loan', reducer)(LoanDetails);
