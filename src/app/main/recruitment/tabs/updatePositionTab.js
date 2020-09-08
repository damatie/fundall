import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';

function NewOpening(props) {
	const dispatch = useDispatch();
	const entity = useSelector(({ Recruitment }) => Recruitment.entity.data);
	const loading = useSelector(({ Recruitment }) => Recruitment.recruitment.loading);

	const [department, setDepartment] = useState([]);
	const [country, setCountry] = React.useState([]);
	const [isFormValid, setIsFormValid] = useState(true);
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
	
	useEffect(() => {
		getDepartment();
	}, []);

	const getDepartment = (entityId = props.selectedPosition.entity.id) => {
		entity.map(entity => {
			if(entity.id === entityId) {
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
		dispatch(Actions.updateOpening(model, props.selectedPosition.id));
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
		{name: 'entityId', label: 'Entity name *', data: entity, value: props.selectedPosition.entity.id },
		{name: 'departmentId', label: 'Department *', data: department, value: props.selectedPosition.department.id},
		{name: 'jobTitle', label: 'Job title', validations: '', icon: 'account-hard-hat', type: 'text', value: props.selectedPosition.jobTitle},
		{name: 'requiredSkills', label: 'Required skills', validations: '', type: 'text', value: props.selectedPosition.requiredSkills},
		{name: 'employeeStatus', label: 'Employee status *', data: ['Full time', 'Contract'], value: props.selectedPosition.employeeStatus},
		{name: 'urgency', label: 'Urgency *', data: ['Immediately', 'Urgent', 'Not urgent'], value: props.selectedPosition.urgency},
		{name: 'dueDate', label: 'Due date', validations: '', type: 'date', value: props.selectedPosition.dueDate},
		{name: 'country', label: 'Country', validations: '', icon: 'email', data: country, value: props.selectedPosition.country},
		{name: 'state', label: 'State', validations: '', icon: 'email', data: state, value: props.selectedPosition.state},
	];

	const recruitmentForm = formInputs.map((input, i) => {
		if (input.type === 'text' || input.type === 'date') {
			return (
				<TextFieldFormsy
					className="mb-8"
					type={input.type}
					name={input.name}
          label={input.label}
          value={input.value}
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
			)
		} else {
			return (
				<SelectFormsy
					className="mb-8"
					name={input.name}
					label={input.label}
					value={input.value}
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
				<ProgressBtn success={false} content='Update Opening' disable={!isFormValid} />
			</Formsy>
		</div>
	);
}

export default withReducer('NewOpening', reducer)(NewOpening);
