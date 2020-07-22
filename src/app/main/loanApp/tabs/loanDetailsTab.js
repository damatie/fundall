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

function LoanDetailsTab({setValue}) {
	const loan = useSelector(({ loan }) => loan.loan.data);
	const profile = useSelector(({ profile}) => profile.data)

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
								<Typography>{loan.email}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Country</Typography>
								<Typography>{loan.country}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Residential Address</Typography>
								<Typography>{loan.residentialAddress}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Amount Requested</Typography>
								<Typography>{loan.amountRequested}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Deductable Amount</Typography>
								<Typography>{loan.deductableAmount}</Typography>
							</div>

              {profile.role.name === 'Finance manager' ? 
								<div className="mb-24">
									<Typography className="font-bold mb-4 text-15">Amount Approved</Typography>
									<Typography>{loan.amountApproved}</Typography>
									<TextField label='Amount approved' type='number' className='w-full' variant='outlined' onChange={e => setValue(e.target.value)}/>
								</div> 
							: <></>}

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Employement Type</Typography>
								<Typography>{loan.employementType}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Annual Pay</Typography>
								<Typography>{loan.annualPay}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Work Location</Typography>
								<Typography>{loan.workLocation}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Payment Mode</Typography>
								<Typography>{loan.paymentMode}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Date Requested</Typography>
								<Typography>{loan.dateRequested}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Duration</Typography>
								<Typography>{`${loan.duration} Months`}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Purpose</Typography>
								<Typography>{loan.purpose}</Typography>
							</div>
						</CardContent>
					</Card>

					{loan.status === 'approved' ? <Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Loan Request Status
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Hr Manager Approval</Typography>
								<Typography>{loan.hrManagerApproval}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Hr Manager Approval Date</Typography>
								<Typography>{loan.hrManagerApprovalDate}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Finance Manager Approval</Typography>
								<Typography>{loan.financeManagerApproval}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Loan Disbursed On</Typography>
								<Typography>{loan.loanDisbursedOn}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">First Due Date</Typography>
								<Typography>{`${loan.firstDueDate} days`}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Number Of Installements</Typography>
								<Typography>{loan.numberOfInstallements}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Payment Mode</Typography>
								<Typography>{loan.paymentMode}</Typography>
							</div>

              <div className="mb-24">
								{/* <Typography className="font-bold mb-4 text-15">Payment Mode</Typography> */}
								{/* <Typography>{leaveRequestDetails.reason}</Typography> */}
							</div>
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
