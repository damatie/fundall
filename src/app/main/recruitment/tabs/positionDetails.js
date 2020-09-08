import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';

function Details(props) {

	const { jobTitle, status, requiredSkills, createdAt, createdBy, recruiter } = props.position;

	return (
		<div className="md:flex max-w-2xl">
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
									General Information
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Entity name</Typography>
								<Typography>{props.position.entity && props.position.entity.entityName}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Department name</Typography>
								<Typography>{props.position.department && props.position.department.departmentName }</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Job title</Typography>
                <Typography>{jobTitle}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Created at</Typography>
								<Typography><Moment format="ddd Do MMM, YY | hh:mm:ss a">{createdAt}</Moment></Typography>
							</div>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Created by</Typography>
								<Typography>{createdBy}</Typography>
							</div>
						</CardContent>
					</Card>

					<Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Work
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Required Skills</Typography>
								<Typography>{requiredSkills}</Typography>
							</div>

						</CardContent>
					</Card>

					<Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Contact
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Recruiter</Typography>
                <Typography>{recruiter ? recruiter : 'No recruiter assigned'}</Typography>
							</div>
						</CardContent>
					</Card>
				</FuseAnimateGroup>
			</div>

		</div>
	);
}

export default Details;
