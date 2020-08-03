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
import React, { useEffect, useState, useRef } from 'react';
// import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as regionActions from 'app/store/actions';
import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import MenuItem from '@material-ui/core/MenuItem';
import ProgressBtn from 'app/shared/progressBtn';
import * as profileActions from 'app/store/actions';
import { useAuth } from 'app/hooks/useAuth';
import GridSystem from 'app/shared/gridSystem';

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
		// dispatch(Actions.getEmployeeProfile());
		dispatch(regionActions.getCountries());
	}, []);

	const formRef = useRef(null);

	const dispatch = useDispatch();

	const id = useAuth().getId;

	//REDUX STORE
	const regions = useSelector(({ regions }) => regions);
	const profile = useSelector(({ profile }) => profile.data);
	const profileState = useSelector(({ profile }) => profile);

	const aboutInfo = [
		{label: 'First name', name: 'firstName', value: profile.firstName, type: 'text'},
		{label: 'Last name', name: 'lastName', value: profile.lastName, type: 'text'},
		{label: 'Middle name', name: 'middleName', value: profile.middleName, type: 'text'},
		{label: 'Email address', name: 'email', value: profile.email, type: 'email'},
		{label: 'Phone number', name: 'phoneNumber', value: profile.phoneNumber, type: 'number'},
		{label: 'Residential address', name: 'residentialAddress', value: profile.residentialAddress, type: 'text'},
		{label: 'Nationality', name: 'country', value: profile.country, type: 'select', data: regions.countries, field: 'name'},
	];

	const TextField = aboutInfo.map((info) => {
		return (
			<div className="mb-24">
				<Typography className="font-bold mb-4 text-15">{info.label}</Typography>
				{info.type !== 'select' ?
				<TextFieldFormsy
					className="mb-16 w-full"
					variant="outlined"
					type={info.type}
					name={info.name}
					value={info.value}
					// validations={{
					//   minLength: 1,
					// }}
					// validationErrors={{
					//   minLength: 'Min character length is 1',
					// }}
					// required
				/> :
				<></>}
				{info.type === 'select' ?
					<SelectFormsy
					className="mb-16 w-full"
					name={info.name}
					value={info.value}
					variant='filled'
					// required
				>
					{info.data.map((item, i) => (
					<MenuItem value={item.id} key={i}>
						{item[info.field]}
					</MenuItem>
					))}
				</SelectFormsy> :
				<></>}
			</div>
		)
	});

	const handleSubmit = model => {
		dispatch(profileActions.updateEmployeeProfile(id, model));
	};

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
							
							<Formsy
                // onValidSubmit={handleSubmit}
                // onValid={enableButton}
                // onInvalid={disableButton}
                ref={formRef}
                // className={}
                onSubmit={handleSubmit}
              >
								<GridSystem>
								{TextField}
								</GridSystem>
								
								<ProgressBtn content='Update Profile' success={profileState.success} loading={profileState.updating}/>
							</Formsy>
							
						</CardContent>
					</Card>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default AboutTab;
