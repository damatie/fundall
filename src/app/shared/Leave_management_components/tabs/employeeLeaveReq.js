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
import DepartmentLeave from './deptLeave';
import LeaveHistory from './leaveHistory';
import LeaveActionBtn from '../actionBtn';

function EmployeeLeaveReq({user}) {

	const leaveRequestDetails = useSelector(({ leaveRequestDetails }) => leaveRequestDetails.data);

	const role = JSON.parse(localStorage.getItem('user_data'));

	return (
		<div className="md:flex">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Leave Request Information
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Leave type</Typography>
								<Typography>{leaveRequestDetails.leaveType}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Leave for</Typography>
								<Typography>{leaveRequestDetails.leaveFor}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">From date</Typography>
								<Typography>{leaveRequestDetails.fromDate}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">To date</Typography>
								<Typography>{leaveRequestDetails.toDate}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Days</Typography>
								<Typography>{`${leaveRequestDetails.days} days`}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Allowance</Typography>
								<Typography>{leaveRequestDetails.allowance ? 'Yes' : 'No'}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Backup employee</Typography>
								<Typography>{leaveRequestDetails.backUpEmployeeName}</Typography>
							</div>

              <div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Leave reason</Typography>
								<Typography>{leaveRequestDetails.reason}</Typography>
							</div>
							<LeaveActionBtn />
						</CardContent>
					</Card>
					<div>
						
					</div>
        </FuseAnimateGroup>
			</div>

			{role.role === 'HR' ? <div className="flex flex-col md:w-320">
				<DepartmentLeave />
				<LeaveHistory />
			</div> : <></>}
		</div>
	);
}

export default EmployeeLeaveReq;
