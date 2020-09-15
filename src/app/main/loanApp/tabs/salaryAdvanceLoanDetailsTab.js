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
// import LoanHistory from './loanHistory';
import moment from 'moment';
import LoanHistory from './loanHistory';
import SalaryAdvanceActionBtn from '../salaryAdvance/salaryAdvanceActionBtn';

function SALoanDetailsTab({setValue}) {
	// const profile = useSelector(({ profile}) => profile.data)
	const salaryAdvanceDetails = useSelector(({ salaryAdvanceDetails}) => salaryAdvanceDetails.salaryAdvances);

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
									Salary Advance Request Information
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Email</Typography>
								<Typography>{salaryAdvanceDetails.details.employee.email}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Department</Typography>
								<Typography>{salaryAdvanceDetails.details.department}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Country</Typography>
								<Typography>{salaryAdvanceDetails.details.employee.country}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Residential Address</Typography>
								<Typography>{salaryAdvanceDetails.details.employee.residentialAddress}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Amount Requested</Typography>
								<Typography>{`₦ ${Intl.NumberFormat().format(salaryAdvanceDetails.details.salaryAdvanceData.amount)}`}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Net Salary</Typography>
								<Typography>{`₦ ${Intl.NumberFormat().format(salaryAdvanceDetails.details.salaryAdvanceData.netSalary)}`}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Director of support service</Typography>
								<Typography>{salaryAdvanceDetails.details.supportDirector}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Finance Manager</Typography>
								<Typography>{salaryAdvanceDetails.details.financeManager}</Typography>
							</div>

							{salaryAdvanceDetails.details.status !== 'approved' ? <SalaryAdvanceActionBtn /> : <></>}

						</CardContent>
					</Card>

					{salaryAdvanceDetails.details.status === 'approved' ? 
          <Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Loan Request Status
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Supervisor Approved Date</Typography>
								<Typography>{moment(salaryAdvanceDetails.details.supervisorApprovalDate).format('LL')}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Director of support service Approved Date</Typography>
								<Typography>{moment(salaryAdvanceDetails.details.supervisorApprovalDate).format('LL')}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Finance Manager Approved Date</Typography>
								<Typography>{!salaryAdvanceDetails.details.financeManagerApprovalDate ? 'Not approved yet' :  moment(salaryAdvanceDetails.details.financeManagerApprovalDate).format('LL')}</Typography>
							</div>

              
							<SalaryAdvanceActionBtn />
						</CardContent>
				</Card> 
         : <></> }
      
			</div>

		  <div className="flex flex-col md:w-320">
				<LoanHistory />
			</div> 
		</div>
	);
}

export default React.memo(SALoanDetailsTab);
