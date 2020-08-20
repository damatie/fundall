import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoanHistory from './loanHistory';
import { TextField } from '@material-ui/core';
import LoanActionsBtn from '../loanActionsBtn';
import { useForm } from '@fuse/hooks';
import _ from '@lodash';

function LoanDetailsTab({setValue}) {
	const loan = useSelector(({ loan }) => loan.loan.data);
	const profile = useSelector(({ profile}) => profile.data);

	const { handleChange, form, setForm} = useForm({
		amountApproved: 0,
		deductableAmount: 0,
	});

	return (
		<div className="md:flex">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				{/* <FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				> */}
					<Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Loan Request Information
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Email</Typography>
								<Typography>{loan.employee.email}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Department</Typography>
								<Typography>{loan.employee.department.departmentName}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Country</Typography>
								<Typography>{loan.employee.country}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Residential Address</Typography>
								<Typography>{loan.employee.residentialAddress}</Typography>
							</div>

							<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Annual Pay</Typography>
									<Typography>{loan.loanData.annualPay}</Typography>
								</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Amount Requested</Typography>
								<Typography>{`₦ ${Intl.NumberFormat().format(loan.loanData.amountRequested)}`}</Typography>
							</div>

							{/* <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Amount Available</Typography>
								<Typography>{`₦ ${Intl.NumberFormat().format(1000)}`}</Typography>
							</div> */}

							{profile.role.name === 'Finance manager' ? 
								<>
								<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Amount Approved</Typography>
									<Typography>{`₦ ${Intl.NumberFormat().format(loan.loanData.amountApproved)}`}</Typography>
								</div> 

								<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Deductable Amount</Typography>
									<Typography>{`₦ ${Intl.NumberFormat().format(loan.loanData.deductableAmount)}`}</Typography>
								</div>

								{/* <div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Annual Pay</Typography>
									<Typography>{loan.annualPay}</Typography>
									<TextField type='number' className='w-full' variant='outlined' onChange={onChange={handleChange}} requried/>
								</div> */}
								</>
							: <></>}

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Work Location</Typography>
								<Typography>{loan.loanData.workLocation}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Payment Mode</Typography>
								<Typography>{loan.loanData.paymentMode}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Date Requested</Typography>
								<Typography>{loan.loanData.dateRequested}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Duration</Typography>
								<Typography>{`${loan.loanData.duration} Months`}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Director of support service </Typography>
								<Typography>{loan.departmentHead}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Director of support service </Typography>
								<Typography>{loan.supportDirector}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Finance Manager</Typography>
								<Typography>{loan.financeManager}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Purpose</Typography>
								<Typography>{loan.loanData.purpose}</Typography>
							</div>
							{loan.loanData.status === 'approved' || loan.loanData.status === 'open' || loan.loanData.status === 'closed'  ? '' : <LoanActionsBtn />}
						</CardContent>
					</Card>

					{loan.loanData.status === 'approved' || loan.loanData.status === 'open' ? <Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Loan Request Status
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Head of department Approver Date</Typography>
								<Typography>{loan.loanData.departmentHeadApprovalDate}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Director of support service Approver Date</Typography>
								<Typography>{loan.loanData.supportDirectorApprovalDate}</Typography>
							</div>

							{loan.loanData.status === 'open' ? 
							<>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Loan Disbursed On</Typography>
								<Typography>{loan.loanData.loanDisbursedOn}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">First Due Date</Typography>
								<Typography>{`${loan.loanData.firstDueDate} days`}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Number Of Installements</Typography>
								<Typography>{loan.loanData.numberOfInstallements}</Typography>
							</div> 
							</>
							: null}

							<div className="mb-24">
								{/* <Typography className="font-bold mb-4 text-15">Payment Mode</Typography>
								<Typography>{loan.loanData.paymentMode}</Typography> */}
							</div>

              <div className="mb-24">
								{/* <Typography className="font-bold mb-4 text-15">Payment Mode</Typography> */}
								{/* <Typography>{leaveRequestDetails.reason}</Typography> */}
							</div>

							<LoanActionsBtn/>


						</CardContent>
				</Card> : <></> }
        {/* </FuseAnimateGroup> */}
			</div>

		  <div className="flex flex-col md:w-320">
				<LoanHistory />
			</div> 
		</div>
	);
}

export default React.memo(LoanDetailsTab);
