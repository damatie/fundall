// import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import LoanHistory from './loanHistory';
// import moment from 'moment';
// import LoanHistory from './loanHistory';
// import SalaryAdvanceActionBtn from '../salaryAdvance/salaryAdvanceActionBtn';
import { formatToNaira } from 'utils/formatNumber';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import useSalaryAdvanceMgt from 'app/hooks/useSalaryAdvanceMgt';
import { useParams } from 'react-router';
import { useAuth } from 'app/hooks/useAuth';

function SALoanDetailsTab({ setValue }) {

	const userProfile = useAuth().getUserProfile;
	const salaryAdvanceDetails = useSelector(({ salaryAdvanceDetails }) => salaryAdvanceDetails.salaryAdvances);

	const { id } = useParams();

	const { showBtn, showCancelBtn, handleApprove, handleReject, handleCancel } = useSalaryAdvanceMgt({
		loan: salaryAdvanceDetails.details.data,
		userRole: userProfile?.role?.name,
		id,
	});

	return (
		<div className="md:flex">
			<div className="flex w-full">
				{/* <FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				> */}
				<Card className="w-full mb-16">
					<AppBar position="static" elevation={0}>
						<Toolbar className="px-8">
							<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
								Salary Advance Request Information
								</Typography>
						</Toolbar>
					</AppBar>

					<CardContent>
						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Email</Typography>
							<Typography>{salaryAdvanceDetails?.details.data.employeeInfo.email}</Typography>
						</div>

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Department</Typography>
							<Typography>{salaryAdvanceDetails?.details.data.salaryAdvanceData.department}</Typography>
						</div>

						{/* <div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Country</Typography>
							<Typography>{salaryAdvanceDetails?.details.employee.country}</Typography>
						</div> */}

						{/* <div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Residential Address</Typography>
							<Typography>{salaryAdvanceDetails?.details.employee.residentialAddress}</Typography>
						</div> */}

						<div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Amount Requested</Typography>
							<Typography>{formatToNaira(salaryAdvanceDetails?.details.data.salaryAdvanceData.amount)}</Typography>
						</div>

						{/* <div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Net Salary</Typography>
							<Typography>{formatToNaira(salaryAdvanceDetails?.details.salaryAdvanceData.netSalary)}</Typography>
						</div> */}

						{/* <div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Director of support service</Typography>
							<Typography>{salaryAdvanceDetails?.details.supportDirector}</Typography>
						</div> */}

						{/* <div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Finance Manager</Typography>
							<Typography>{getEmployeeName(employeeList, salaryAdvanceDetails?.details.data.salaryAdvanceData.financeManager)}</Typography>
						</div> */}

						{/* <div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Supervisor Approved Date</Typography>
							<Typography>{moment(salaryAdvanceDetails?.details.supervisorApprovalDate).format('LL')}</Typography>
						</div> */}

						{/* <div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Director of support service Approved Date</Typography>
							<Typography>{moment(salaryAdvanceDetails?.details.supervisorApprovalDate).format('LL')}</Typography>
						</div> */}

						{/* <div className="mb-24">
							<Typography className="font-bold mb-4 text-15">Finance Manager Approved Date</Typography>
							<Typography>{!salaryAdvanceDetails?.details.financeManagerApprovalDate ? 'Not approved yet' : moment(salaryAdvanceDetails?.details.financeManagerApprovalDate).format('LL')}</Typography>
						</div> */}

						<div className="flex items-center justify-evenly w-2/4 mx-auto">
							{
								showBtn ?
									<>
										<CustomIconButton type='success' icon='check' onClick={handleApprove}>
											Accept
										</CustomIconButton>

										<CustomIconButton type='error' icon='cancel' onClick={() => handleReject(salaryAdvanceDetails.details.data.salaryAdvanceData)}>
											Reject
										</CustomIconButton>
									</>
									: (salaryAdvanceDetails?.details.data.salaryAdvanceData.status.toLowerCase() === 'approved') ?
										<>
											<CustomIconButton type='success' icon='check' onClick={handleApprove}>
												Disbursed
											</CustomIconButton>
										</>
									:
									<></>
							}

							{
								showCancelBtn ?
									<>
										<CustomIconButton type='error' icon='cancel' onClick={handleCancel} >
											Close Request
										</CustomIconButton>
									</>
									: <></>
							}
						</div>

					</CardContent>

				</Card>
			</div>
		</div>
	);
}

export default React.memo(SALoanDetailsTab);
