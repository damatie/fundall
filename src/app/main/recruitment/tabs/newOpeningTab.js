import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import * as LocationActions from '../../../store/actions/index';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import { DateTimePicker } from '@material-ui/pickers';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router';
// import moment from 'moment';
// import * as entityActions from 'app/main/HR/business_unit/store/actions';
// import * as departmentActions from 'app/main/HR/business_unit/department/store/actions';
// import * as rolesActions from 'app/main/HR/roles/store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { fetchHeaders } from 'app/shared/fetchHeaders'
// import { State } from 'velocity-animate';

// const baseUrl = getBaseUrl;
// const headers = fetchHeaders();

function NewOpening(props) {
	const dispatch = useDispatch();
	const entity = useSelector(({ createOpening }) => createOpening.entity.data);
	const loading = useSelector(({ createOpening }) => createOpening.recruitment.loading);

	// const country = useSelector(({ regions }) => regions.countries.map(country => country.name));
	// const state = useSelector(({ regions }) => regions.states.map(state => state.name));
	// const roles = useSelector(({ roles }) => roles.roles);
	const [department, setDepartment] = useState([]);

	const [details, setDetails] = useState({
		departmentId: "",
		entityId: "",
		jobTitle: "",
		reasonForEmployment: "",
		duration: "",
		employeeToBeReplaced: "",
		positionType: "",
		startDate: "",
		endDate: "",
		dueDate: "",
		employeeGrade: ""
	});

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	useEffect(() => {
		console.log(entity)
	}, [details])

	const getDepartment = (entityName) => {
		entity.map(entity => {
			if (entity.id === entityName) {
				setDepartment(entity.department);
			}
		})
	}

	// const getState = (country, input) => {
	// 	if (input === 'country') dispatch(LocationActions.getStates(country));
	// }

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit() {
		// model.dueDate = dueDate;
		console.log(details);
		dispatch(Actions.createOpening(details));
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

	const handleChange = (name, value) => {
		setDetails(state => ({ ...state, [name]: value }));
		if (name === "entityId") {
			getDepartment(value);
		}
	}

	const formInputs = [
		{ name: 'entityId', label: 'Entity name *', data: entity, validations: "" },
		{ name: 'departmentId', label: 'Department *', data: department, validations: "" },
		{ name: 'jobTitle', label: 'Job Role ', validations: '', icon: 'account-hard-hat', type: 'text' },
		{ name: 'reasonForEmployment', label: 'Employee status *', data: ['New Employee', 'Replacement', 'Industrial Training', 'National Service'] },
		{ name: 'duration', label: 'Duration ', validations: '', type: 'text' },
		{ name: 'employeeToBeReplaced', label: 'Employee To be Replaced', type: "text", validations: "" },
		{ name: 'positionType', label: 'Position Type *', data: ['Permanent', 'Temporary'] },
		{ name: 'startDate', label: 'Start date *', validations: '', type: 'date' },
		{ name: 'endDate', label: 'End date *', validations: '', type: 'date' },
		{ name: 'dueDate', label: 'Desired Hire date *', validations: '', type: 'date' },
		{ name: 'employeeGrade', label: 'Employee Grade *', validations: '', data: ["GL1", "GL2", "GL3", "GL4", "GL5"] },
	];

	const recruitmentForm = formInputs.map((input, i) => {
		if (input.type === 'text') {
			if (input.name === "duration") {
				if (details["reasonForEmployment"].toLowerCase() === "industrial training") {
					return (
						<TextFieldFormsy
							className="mb-16"
							type={input.type}
							name={input.name}
							label={input.label}
							value={details[input.name]}
							onChange={(e) => handleChange(input.name, e.target.value)}
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
						/>)
				}
				else {
					return <></>
				}
			} else if (input.name === "employeeToBeReplaced") {
				if (details["reasonForEmployment"].toLowerCase() === "replacement") {
					return (
						<TextFieldFormsy
							className="mb-16"
							type={input.type}
							name={input.name}
							label={input.label}
							value={details[input.name]}
							onChange={(e) => handleChange(input.name, e.target.value)}
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
						/>)
				}
				else {
					return <></>
				}
			} else {
				return (
					<>
						<TextFieldFormsy
							className="mb-16"
							type={input.type}
							name={input.name}
							label={input.label}
							value={details[input.name]}
							onChange={(e) => handleChange(input.name, e.target.value)}
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
			}
		} else if (input.type === 'date') {
			if (input.name === "startDate" || input.name === "endDate") {
				if (details["positionType"].toLowerCase() === "temporary") {
					return (
						<TextFieldFormsy
							className="mb-16"
							type={input.type}
							name={input.name}
							label={input.label}
							value={details[input.name]}
							onChange={(e) => handleChange(input.name, e.target.value)}
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
						/>)
				}
				else {
					return <></>
				}
			} else {
				return (
					<>
						<TextField
							label={input.label}
							type={input.type}
							variant='outlined'
							value={details[input.name]}
							onChange={(e) => handleChange(input.name, e.target.value)}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</>
				)
			}
		} else {
			return (
				<SelectFormsy
					className="mb-16"
					name={input.name}
					label={input.label}
					variant="outlined"
					required
					requiredError='Must not be None'
					value={details[input.name]}
					onChange={(e) => handleChange(input.name, e.target.value)}
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
					{recruitmentForm}
				</GridSystem>
				<ProgressBtn success={false} loading={loading} content='Create Opening' disable={!isFormValid} />
			</Formsy>
		</div>
	);
}

export default withReducer('NewOpening', reducer)(NewOpening);