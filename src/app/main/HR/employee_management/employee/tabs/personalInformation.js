import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
// import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


function BusinessUnitTab(props) {
	const dispatch = useDispatch();
	const params = useParams();

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	useEffect(() => {
		// if (register.error && (register.error.username || register.error.password || register.error.email)) {
		// 	formRef.current.updateInputsWithError({
		// 		...register.error
		// 	});
		// 	disableButton();
		// }
	}, []);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		// dispatch(Actions.saveBusinessUnit(model));
	}

  const Names = [
    { label: 'First name', name: 'firstName', icon: 'person', type: 'text', value: '' },
    { label: 'Last name', name: 'lastName', icon: 'person', type: 'text', value: '' },
		{ label: 'Other name', name: 'otherName', icon: 'person',  type: 'text', value: '' },
	];
	
	const Email = [
		{label: 'Personal' , name: 'personal', icon: 'mail', type: 'email', value: ''},
		{label: 'Office' , name: 'office', icon: 'mail', type: 'email', value: ''},
		{label: 'Other' , name: 'other', icon: 'mail', type: 'email', value: ''}
	];

	const number = [
		{label: 'Personal' , name: 'personal', icon: 'phone', type: 'number', value: ''},
		{label: 'Office' , name: 'office', icon: 'phone', type: 'number', value: ''}
	];

	const selects = [
		{label: 'Gender', name: 'gender', value: '', data: ['Male', 'Female', 'Other'], type: 'none'},
		{label: 'Marital status', name: 'maritalStatus', value: '', data: ['Single', 'Married', 'Engaged', 'Complicated'], type: 'none'},
		{label: 'Nationality', name: 'nationality', value: '', data: ['State one', 'State Two'], type: 'none'},
		{label: 'State of origin', name: 'stateOfOrigin', value: '', data: ['State one', 'State Two'], type: 'none'},
		{label: 'Local government area', name: 'lga', value: '', data: ['State one', 'State Two'], type: 'none'},
		{label: 'Locaton', name: 'location', value: '', type: 'input', icon: 'map'}
	];

	const locations = [
		{label: 'Current', name: 'current', value: '', icon: 'map', type: 'text'},
		{label: 'Permanent', name: 'permanent', value: '', icon: 'map', type: 'text'}
	];

	const other = [
		{label: 'Zip code', name: 'zipCode', value: '', icon: 'phone_android', type: 'number'},
		{label: 'Passport number', name: 'passportNmuber', value: '', icon: 'contact_mail', type: 'text'},
		{label: 'ID card number', name: 'passportNmuber', value: '', icon: 'credit_card', type: 'text'},
	]
  
  const NameTextField = Names.map((info) => {
    return <TextFieldFormsy
					className="mb-16"
					type={info.type}
					name={info.name}
					label={info.label}
					value={info.value}
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									{info.icon}
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
	});
	
	const Select = selects.map(info => {
		if(info.type === 'none') {
			return (
				<SelectFormsy
					className="mb-16"
					name={info.name}
					label={info.label}
					value={info.value}
					variant="outlined"
					required
					requiredError='Must not be None'
					// onChange={e => {
					// 	getDepartments(e.target.value);
					// }}
				>
				{info.data.map(item => (
					<MenuItem value={item} key={item}>{item}</MenuItem>
				))}
			</SelectFormsy>
			)
		} else {
			return (
			<TextFieldFormsy
				className="mb-16"
				type={info.type}
				name={info.name}
				label={info.label}
				value={info.value}
				validations={{
					minLength: 1
				}}
				validationErrors={{
					minLength: 'Min character length is 1'
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Icon className="text-20" color="action">
								{info.icon}
							</Icon>
						</InputAdornment>
					)
				}}
				variant="outlined"
				required
			/>
			)
		}
		
	});

	const Numbers = number.map(info => {
		return (
			<TextFieldFormsy
				className="mb-16"
				type={info.type}
				name={info.name}
				label={info.label}
				value={info.value}
				validations={{
					minLength: 1
				}}
				validationErrors={{
					minLength: 'Min character length is 1'
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Icon className="text-20" color="action">
								{info.icon}
							</Icon>
						</InputAdornment>
					)
				}}
				variant="outlined"
				required
			/>
		)
	});

	const Emails = Email.map(info => {
			return <TextFieldFormsy
				className="mb-16"
				type={info.type}
				name={info.name}
				label={info.label}
				value={info.value}
				validations={{
					minLength: 1
				}}
				validationErrors={{
					minLength: 'Min character length is 1'
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Icon className="text-20" color="action">
								{info.icon}
							</Icon>
						</InputAdornment>
					)
				}}
				variant="outlined"
				required
			/>
	});

	const Locations = locations.map(info => {
		return (
			<TextFieldFormsy
				className="mb-16"
				type={info.type}
				name={info.name}
				label={info.label}
				value={info.value}
				validations={{
					minLength: 1
				}}
				validationErrors={{
					minLength: 'Min character length is 1'
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Icon className="text-20" color="action">
								{info.icon}
							</Icon>
						</InputAdornment>
					)
				}}
				variant="outlined"
				required
			/>
		)
	});

	const Others = other.map(info => {
		return (
			<TextFieldFormsy
				className="mb-16"
				type={info.type}
				name={info.name}
				label={info.label}
				value={info.value}
				validations={{
					minLength: 1
				}}
				validationErrors={{
					minLength: 'Min character length is 1'
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Icon className="text-20" color="action">
								{info.icon}
							</Icon>
						</InputAdornment>
					)
				}}
				variant="outlined"
				required
			/>
		)
	});

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
        {NameTextField}
				<Typography className='my-16' variant="subtitle1">Email Address</Typography>
				{Emails}
				<Divider className='my-16'/>
				<Typography className='my-16' variant="subtitle1">Contact Number</Typography>
				{Numbers}
				<Divider className='my-16'/>
				{Select}
				<Typography className='my-16' variant="subtitle1">Date of birth</Typography>
				<TextFieldFormsy
				className="mb-16"
				type={'date'}
				name={'dateOfBirth'}
				// label={info.label}
				// value={info.value}
				validations={{
					minLength: 1
				}}
				validationErrors={{
					minLength: 'Min character length is 1'
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							{/* <Icon className="text-20" color="action">
								{'event'}
							</Icon> */}
						</InputAdornment>
					)
				}}
				variant="outlined"
				required
			/>
				<Typography className='my-16' variant="h6">Contact Address</Typography>
				{Locations}
				<Divider className='my-16'/>
				{Others}

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					// disabled={!isFormValid || businessUnit.loading}
					value="legacy"
				>
					{params.id ? 'Update' : 'Save'}
				</Button>
			</Formsy>
		</div>
	);
}

export default BusinessUnitTab;
