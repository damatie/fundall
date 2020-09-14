import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import { DateTimePicker } from '@material-ui/pickers';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import moment from 'moment';
import * as entityActions from 'app/main/HR/business_unit/store/actions';
import * as departmentActions from 'app/main/HR/business_unit/department/store/actions';
import * as rolesActions from 'app/main/HR/roles/store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';

function NewOpening(props) {
	const dispatch = useDispatch();
	const entity = useSelector(({ createOpening }) => createOpening.entity.data);
	const loading = useSelector(({ createOpening }) => createOpening.recruitment.loading);
	// const department = useSelector(({ department }) => department.departments);
	// const roles = useSelector(({ roles }) => roles.roles);

	const [department, setDepartment] = useState([]);
	const [country, setCountry] = React.useState([]);
	const [isFormValid, setIsFormValid] = useState(true);
	const [dueDate, setDueDate] = useState(new Date());
	const formRef = useRef(null);

	useEffect(() => {
		if (country.length > 0) return;
		fetch('https://restcountries.eu/rest/v2/all')
			.then(res => res.json())
			.then(res => {
				setCountry(res.map(country => country.name));
			})
			.catch(err => console.log(err))
	}, [])
	
	const getDepartment = (entityName) => {
		entity.map(entity => {
			if(entity.id === entityName) {
				setDepartment(entity.department);
			}
		})
	}

	useEffect(() => {
		// if (register.error && (register.error.username || register.error.password || register.error.email)) {
		// 	formRef.current.updateInputsWithError({
		// 		...register.error
		// 	});
		// 	disableButton();
		// }
		// dispatch(entityActions.getBusinessUnits());
		// dispatch(rolesActions.getRoles());
	}, []);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		model.dueDate = moment(dueDate).format('dd-mm-yyyy');
		console.log(model);
		dispatch(Actions.createOpening(model));
	}

	const checkName = (item) => {
		if (item.entityName) return item.entityName;
		if (item.departmentName) return item.departmentName;
		return item;
	}

	const checkValue = (item) => {
		if (item.entityName) return item.id;	
		if (item.departmentName) return item.id;
		return item;
	}

	let state = ['Abia', 'Akwa ibom', 'Adamawa', 'Bauchi', 'Bayelsa', 'Lagos', 'Ogun', 'Rivers'];

	const formInputs = [
		{name: 'entityId', label: 'Entity name *', data: entity},
		{name: 'departmentId', label: 'Department *', data: department},
		{name: 'jobTitle', label: 'Job title', validations: '', icon: 'account-hard-hat', type: 'text'},
		{name: 'requiredSkills', label: 'Required skills', validations: '', type: 'text'},
		{name: 'employeeStatus', label: 'Employee status *', data: ['Full time', 'Contract']},
		{name: 'urgency', label: 'Urgency *', data: ['Immediately', 'Urgent', 'Not urgent']},
		{name: 'dueDate', label: 'Due date', validations: '', type: 'date'},
		{name: 'country', label: 'Country *', validations: '', icon: 'email', data: country},
		{name: 'state', label: 'State *', validations: '', icon: 'email', data: state},
	];

	const recruitmentForm = formInputs.map((input, i) => {
		if (input.type === 'text') {
			return (
				<>
				<TextFieldFormsy
					className="mb-16"
					type={input.type}
					name={input.name}
					label={input.label}
					// validations="isEmail"
					// validationErrors={{
					// 	isEmail: 'Please enter a valid email'
					// }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									{input.icon}
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
				</>
			)
		}else if (input.type === 'date') {
			return (
				<>
				{/* <TextFieldFormsy
					className="mb-16"
					type={input.type}
					name={input.name}
					label={input.label}
					// validations="isEmail"
					// validationErrors={{
					// 	isEmail: 'Please enter a valid email'
					// }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									{input.icon}
								</Icon>
							</InputAdornment>
						),
						shrink: true,
					}}
					variant="outlined"
					required
				/> */}
				<DateTimePicker
					name={input.name}
					label={input.label}
					inputVariant="outlined"
					value={dueDate}
					hidden={true}
					onChange={date => setDueDate(date)}
					className="mt-8 mb-16 w-full"
					format={'MMMM Do, YYYY hh:mm a'}
					minDate={new Date()}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									{input.icon}
								</Icon>
							</InputAdornment>
						)
					}}
				/>
				</>
			)	
		} else {
			return (
				<>
				<SelectFormsy
					className="mb-16"
					name={input.name}
					label={input.label}
					value=""
					variant="outlined"
					required
					requiredError='Must not be None'
					onChange={e => {
						getDepartment(e.target.value);
					}}
				>
					{input.data.map((item, i) => (
						<MenuItem value={checkValue(item)} key={i}>{checkName(item)}</MenuItem>
					))}
				</SelectFormsy>
				</>
			)
		}
	})

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<GridSystem>
					{ recruitmentForm }
				</GridSystem>
				<ProgressBtn success={false} loading={loading} content='Create Opening' disable={!isFormValid} />
			</Formsy>
		</div>
	);
}

export default withReducer('NewOpening', reducer)(NewOpening);
