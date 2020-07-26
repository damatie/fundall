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
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux';

const img = [
	'assets/images/avatars/jane.jpg',
	'assets/images/avatars/alice.jpg',
	'assets/images/avatars/vincent.jpg',
	'assets/images/avatars/garry.jpg',
	'assets/images/avatars/andrew.jpg',
	'assets/images/avatars/carl.jpg',
]
function AboutTab() {
	React.useEffect(() => {
		dispatch(Actions.getEmployeeProfile());
	}, []);

	const dispatch = useDispatch();

	const aboutInfo = [
		{label: 'First name', name: 'firstName', value: '', type: 'text'},
		{label: 'Last name', name: 'lastName', value: '', type: 'text'},
		{label: 'Middle name', name: 'middleName', value: '', type: 'text'},
		{label: 'Email address', name: 'email', value: '', type: 'email'},
		{label: 'Phone number', name: 'phoneNumber', value: '', type: 'number'},
		{label: 'Middle name', name: 'middleName', value: '', type: 'text'},
	]

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
									General Information
								</Typography>
								<Button className="normal-case" color="inherit" size="small">
									update
								</Button>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">First name</Typography>
								{/* <Typography>{general.gender}</Typography> */}
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Last name</Typography>
								{/* <Typography>{general.birthday}</Typography> */}
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Middle name</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-bold mb-4 text-15">Email</Typography>
								{/* <Typography>{'general.about'}</Typography> */}
							</div>
						</CardContent>
					</Card>
				</FuseAnimateGroup>
			</div>

			<div className="flex flex-col md:w-320">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Contact
								</Typography>
								<Button className="normal-case" color="inherit" size="small">
									update
								</Button>
							</Toolbar>
						</AppBar>
						<CardContent className="flex flex-wrap p-8">
							{/* {img.map((friend, i) => (
								<img
									key={i}
									className="w-64 m-4 rounded-4 block"
									src={friend}
									alt={friend}
								/>
							))} */}
						</CardContent>
					</Card>
					<Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Friends
								</Typography>
								<Button className="normal-case" color="inherit" size="small">
									See 454 more
								</Button>
							</Toolbar>
						</AppBar>
						<CardContent className="flex flex-wrap p-8">
							{img.map((friend, i) => (
								<img
									key={i}
									className="w-64 m-4 rounded-4 block"
									src={friend}
									alt={friend}
								/>
							))}
						</CardContent>
					</Card>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default AboutTab;
