import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import * as LocationActions from '../../../store/actions/index';
import * as employeeActions from 'app/store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';
import { TextField } from '@material-ui/core';

function NewOpening(props) {
	const dispatch = useDispatch();
	const entity = useSelector(({ Recruitment }) => Recruitment.entity.data);
	// const loading = useSelector(({ Recruitment }) => Recruitment.recruitment.loading);
	const employeeList = useSelector(state => state.employeeList.employeeList)

	const [department, setDepartment] = useState([]);
	const [country, setCountry] = React.useState([]);
	const state = useSelector(({ regions }) => regions.states.map(state => state.name));

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

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
		employeeGrade: "",
		urgency: "",
		country: "",
		state: ""
	});

	useEffect(() => {
		dispatch(employeeActions.getAllEmployee());
	}, [dispatch])

	useEffect(() => {
		if (country.length > 0) return;
		fetch('https://restcountries.eu/rest/v2/all')
			.then(res => res.json())
			.then(res => {
				setCountry(res.map(country => country.name));
			})
			.catch(err => console.log(err))
	}, [country])

	useEffect(() => {
		getDepartment();
	});

	const getDepartment = (entityId = props.selectedPosition?.entityId ?? props.selectedPosition?.entity.id) => {
		return entity.map(entity => {
			if (entity.id === entityId) {
				setDepartment(entity.department);
			}
		})
	}

	const getState = (country) => {
		dispatch(LocationActions.getStates(country));
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

	function handleSubmit() {
		dispatch(Actions.updateOpening(details, props.selectedPosition.id));
		props.setUpdateOpen(false);
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
		// console.log(name, value, "new a")
		setDetails(state => ({ ...state, [name]: value }));
		if (name === "entityId") {
			getDepartment(value);
		} else if (name === "country") {
			getState(value)
		}
	}

	useEffect(() => {

	}, [details])

	useEffect(() => {
		if (!details.state) {
			getState(details.country)
		}
	}, [country, state])

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
		{ name: 'urgency', label: 'Urgency *', data: ['Immediately', 'Urgent', 'Not urgent'], value: props.selectedPosition.urgency },
		{ name: 'country', label: 'Country', validations: '', icon: 'email', data: country, value: props.selectedPosition.country },
		{ name: 'state', label: 'State', validations: '', icon: 'email', data: state, value: props.selectedPosition.state }
	];

	useEffect(() => {
		// console.log(props.selectedPosition)
		const { employeeStatus, dueDate, requiredSkills, jobTitle, entity, entityId, department, jobDescription, departmentId, country, state, urgency, reasonForEmployment } = props.selectedPosition;
		setDetails({
			departmentId: department?.id ?? departmentId,
			entityId: entity?.id ?? entityId,
			jobTitle,
			jobDescription,
			employeeStatus,
			duration: props.selectedPosition?.duration ?? "",
			requiredSkills,
			employeeToBeReplaced: props.selectedPosition?.employeeToBeReplaced ?? "",
			positionType: props.selectedPosition?.positionType ?? "",
			startDate: props.selectedPosition?.startDate ?? "",
			endDate: props.selectedPosition?.endDate ?? "",
			dueDate,
			employeeGrade: props.selectedPosition?.employeeGrade ?? "",
			urgency,
			country,
			reasonForEmployment,
			state
		});
		getState(country);
	}, [props.selectedPosition,]);

	useEffect(() => {
		if (props?.selectedPosition?.country) {
			getState(props?.selectedPosition?.country);
		}
	}, [props.selectedPosition?.country])

	const recruitmentForm = formInputs.map((input, i) => {
		if (input.type === 'text') {
			if (input.name === "duration") {
				if (details["reasonForEmployment"]?.toLowerCase() === "industrial training") {
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
			} else if (input.name === "employeeToBeReplaced") {
				if (details["reasonForEmployment"]?.toLowerCase() === "replacement") {
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
				if (details["positionType"]?.toLowerCase() === "temporary") {
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
				if (details["reasonForEmployment"]?.toLowerCase() === "replacement") {
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
				<ProgressBtn success={false} content='Update Opening' disable={!isFormValid} />
			</Formsy>
		</div>
	);
}

export default withReducer('NewOpening', reducer)(NewOpening);
