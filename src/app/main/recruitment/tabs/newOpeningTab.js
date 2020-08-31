import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
// import * as Actions from '../../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import * as entityActions from 'app/main/HR/business_unit/store/actions';
import * as departmentActions from 'app/main/HR/business_unit/department/store/actions';
import * as rolesActions from 'app/main/HR/roles/store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';

function NewOpening(props) {
	const dispatch = useDispatch();
	// const employee = useSelector(({ employees }) => employees.employee);
	// const entity = useSelector(({ entity }) => entity.businessUnits);
	// const department = useSelector(({ department }) => department.departments);
	// const roles = useSelector(({ roles }) => roles.roles);

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

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
		// dispatch(Actions.saveEmployee(model));
	}

	const getDepartments = id => {
		// dispatch(departmentActions.getDepartments(id));
	}

	// if(employee.success) {
	// 	return (
	// 		<Redirect to='/hr/employee_management' />
	// 	);
	// }

	const [country, setCountry] = React.useState(['a', 'b', 'c']);
	let state = ['a', 'b', 'c'];

	const formInputs = [
		{name: 'entityId', label: 'Entity name', validations: '', icon: 'email', type: 'text'},
		{name: 'departmentId', label: 'Department', validations: '', icon: 'email', type: 'text'},
		{name: 'jobTitle', label: 'Job title', validations: '', icon: 'email', type: 'text'},
		{name: 'requiredSkills', label: 'Required skills', validations: '', icon: 'email', type: 'text'},
		{name: 'employeeStatus', label: 'Employee status', validations: '', icon: 'email', type: 'text'},
		{name: 'urgency', label: 'Urgency', validations: '', icon: 'email', data: ['Immediately', 'Urgent', 'Not urgent']},
		{name: 'dueDate', label: 'Due date', validations: '', icon: 'email', type: 'text'},
		{name: 'state', label: 'State', validations: '', icon: 'email', data: state},
		{name: 'country', label: 'Country', validations: '', icon: 'email', data: country},
	];

	const recruitmentForm = formInputs.map((input, i) => {
		if (input.type === 'text') {
			return (
				<TextFieldFormsy
					className="mb-16"
					type="text"
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
									email
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
					className="mb-16"
					name={input.name}
					label={input.label}
					value=""
					variant="outlined"
					required
					requiredError='Must not be None'
					onChange={e => {
						getDepartments(e.target.value);
					}}
				>
					{input.data.map(item => (
						<MenuItem value={item} key={item}>{item}</MenuItem>
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
				<ProgressBtn success={false} loading={false} content='Create Opening' disable={!isFormValid} />
			</Formsy>
		</div>
	);
}

export default NewOpening;
