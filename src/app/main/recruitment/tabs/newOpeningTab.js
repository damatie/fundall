import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import * as LocationActions from '../../../store/actions/index';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as employeeActions from 'app/store/actions';

import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';

function NewOpening(props) {
	const dispatch = useDispatch();
	const entity = useSelector(({ createOpening }) => createOpening.entity.data);
	const loading = useSelector(({ createOpening }) => createOpening.recruitment.loading);

	const employeeList = useSelector(state => state.employeeList.employeeList)
	const [department, setDepartment] = useState([]);
	const [country, setCountry] = React.useState([]);
	const state = useSelector(({ regions }) => regions.states.map(state => state.name));

	const [details, setDetails] = useState({
		departmentId: "",
		entityId: "",
		jobTitle: "",
		requiredSkills: "",
		reasonForEmployment: "",
		duration: "",
		employeeToBeReplaced: "",
		employeeStatus: "",
		positionType: "",
		startDate: "",
		endDate: "",
		dueDate: "",
		employeeGrade: "",
		urgency: "",
		country: "",
		state: ""
	});

	useEffect(() => {
		if (country.length > 0) return;
		fetch('https://restcountries.eu/rest/v2/all')
			.then(res => res.json())
			.then(res => {
				setCountry(res.map(country => country.name));
			})
			.catch(err => console.log(err))
	}, [country])

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	useEffect(() => {
		// console.log(details)
		dispatch(employeeActions.getAllEmployee());
	}, [dispatch])

	const getDepartment = (entityName) => {
		entity.map(entity => {
			if (entity.id === entityName) {
				setDepartment(entity.department);
			}
		})
	}

	const getState = (country) => {
		dispatch(LocationActions.getStates(country));
	}

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit() {
		// model.dueDate = dueDate;
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
		} else if (name === "country") {
			console.log(value)
			getState(value)
		}
	}

	const formInputs = [
		{ name: 'entityId', label: 'Entity name *', data: entity, validations: "" },
		{ name: 'departmentId', label: 'Department *', data: department, validations: "" },
		{ name: 'jobTitle', label: 'Job Title ', validations: '', icon: 'account-hard-hat', type: 'text' },
		{ name: 'jobDescription', label: 'Job Description ', validations: '', icon: 'account-hard-hat', type: 'text' },
		{ name: 'requiredSkills', label: 'Required Skills', validations: '', icon: 'account-hard-hat', type: 'text' },
		{ name: 'reasonForEmployment', label: 'Reason for Employment *', data: ['New Employee', 'Replacement', 'Industrial Training', 'National Service'] },
		{ name: 'employeeStatus', label: 'Employee Status ', validations: '', data: ["Full-Time", "Part-Time"] },
		{ name: 'duration', label: 'Duration ', validations: '', type: 'text' },
		{ name: 'employeeToBeReplaced', label: 'Employee To be Replaced', data: employeeList },
		{ name: 'positionType', label: 'Position Type *', data: ['Permanent', 'Temporary'] },
		{ name: 'startDate', label: 'Start date *', validations: '', type: 'date' },
		{ name: 'endDate', label: 'End date *', validations: '', type: 'date' },
		{ name: 'dueDate', label: 'Desired Hire date *', validations: '', type: 'date' },
		{ name: 'employeeGrade', label: 'Employee Grade *', validations: '', data: ["GL1", "GL2", "GL3", "GL4", "GL5"] },
		{ name: 'urgency', label: 'Urgency *', data: ['Immediately', 'Urgent', 'Not urgent'] },
		{ name: 'country', label: 'Country', validations: '', icon: '', data: country },
		{ name: 'state', label: 'State', validations: '', icon: '', data: state },
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
			}
			else if (input.name === "employeeToBeReplaced") {
				if (details["reasonForEmployment"].toLowerCase() === "replacement") {
					return (
						<TextFieldFormsy
							className="mb-16"
							type={input.type}
							name={input.name}
							label={input.label}
							value={details[input.name]}
							onChange={(e) => handleChange(input.name, e.target.value)}
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
			}
			else {
				return (
					<>
						<TextFieldFormsy
							className="mb-16"
							type={input.type}
							name={input.name}
							label={input.label}
							value={details[input.name]}
							onChange={(e) => handleChange(input.name, e.target.value)}
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
		}
		else {
			if (input.name === "employeeToBeReplaced") {
				if (details["reasonForEmployment"].toLowerCase() === "replacement") {
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
							{input?.data?.map((item, i) => (
								<MenuItem value={item.id} key={i}>{item.firstName} {item.lastName}</MenuItem>
							))}
						</SelectFormsy>
					)
				} else {
					return <> </>;
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
						{input?.data?.map((item, i) => (
							<MenuItem value={checkValue(item)} key={i}>{checkName(item)}</MenuItem>
						))}
					</SelectFormsy>
				)
			}
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