// import { TextFieldFormsy } from '@fuse/core/formsy';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import InputAdornment from '@material-ui/core/InputAdornment';
// // import * as Actions from '../store/actions';
// import Formsy from 'formsy-react';
// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router';
// import { useParams } from 'react-router-dom';

// function BusinessUnitTab(props) {
// 	const dispatch = useDispatch();
// 	// const businessUnit = useSelector(({ businessUnit }) => businessUnit.businessUnit);
// 	const params = useParams();

// 	const [isFormValid, setIsFormValid] = useState(true);
// 	const formRef = useRef(null);

// 	useEffect(() => {
// 	}, []);

// 	function disableButton() {
// 		setIsFormValid(false);
// 	}

// 	function enableButton() {
// 		setIsFormValid(true);
// 	}

// 	function handleSubmit(model) {
// 		// dispatch(Actions.saveBusinessUnit(model));
//   }
  
// 	const natureOfEmployeement = [
// 		{label: 'Nature of Employement', name: 'natureOfEmployeement', value: '', data: ['Permanent', 'Contract', 'Consultant'], type: 'select'},
// 		{label: 'Type of hire', name: 'typeOfHire', value: '', data: ['New hire', 'Re-hire'], type: 'select'},
// 		{label: 'Entity', name: 'entity', value: '', data: [1, 2], type: 'select'},
// 		{label: 'Department', name: 'department', value: '', data: [1,2], type: 'select'},
// 		{label: 'Date of employeement', name: 'dateOfEmployeement', value: '', type: 'date'},
// 		{label: 'Date of exit', name: 'dateOfExit', value: '', type: 'date'},
// 		{label: 'Confirmation date', name: 'confirmationDate', value: '', type: 'date'},
// 		{label: 'Confirmation score', name: 'confirmationScore', value: '', type: 'number'},
// 		{label: 'Confirmation status', name: 'confirmationStatus', vale: '', data: ['Confirmed', 'Not confirmed', 'Deffered for 3 months', 'Not applicable',], type: 'select'},
// 		{label: 'Confirmation comment', name: 'confirmation Comment', value: '', type: 'textArea'},
// 		{label: 'Years in service', name: 'yearsInService', type: 'select', data: () => {
// 			const arr = [];
// 			for(let i = 1; i <= 35; i+=1) {
// 				arr.push(i)
// 			}
// 			return arr;
// 		}},
// 		{label: 'Line manager', name: 'lineManager', value: '', type: 'text'},
// 		{label: 'University', name: 'unversity', value: '', type: 'text'},
// 		{label: 'Qualification', name: 'qualification', value: '', type: 'Select', data: ['masters', 'Phd', 'Bsc', 'Hnd', 'Beng', 'Btech', 'nd', 'Nce']},
// 		{label: 'Other Certification', name: 'others', value: '', type: 'text'},
// 		{lable: 'Grade level', name: 'gradeLevel', value: '', type: 'select', data: []},
// 		{label: 'Designation', name: 'designation', value: '', type: 'select', data: []},
// 		{label: 'Grade description', name: 'gradeDescription', type: 'select', value: '', data: []},
// 		{title: 'Disciplinary index', type: 'typo'},
// 		{label: 'Disciplinary index date', name: 'date', value: '', type: 'date',},
// 		{label: 'Query', name: 'query', value: '', data: [1,2,3], type: 'select'},
// 		{label: 'Warnings', name: 'warnings', value: '', data: [1,2,3], type: 'select'},
// 		{label: 'Verbal warning', name: 'verbalWarning', value: '', data: [1,2,3], type:'select'},
// 		{label: 'Written warning', name: 'writtenWarning', value: '', data: [1,2,3], type: 'select'},
// 		{label: 'Termination', name: 'termination', value: '', data: [1,2,3], type: 'select'},
// 		{label: 'Dismissal', name: 'dismissal', data: [1,2,3], value: '', type: 'select'},
// 		{label: 'Summary dismissal', name: 'summaryDismissal', value: '', data: [1,2,3], type: 'select'},
// 		{label: ''}
// 	];
  
//   const TextField = employmentInfo.map((info) => {
//     return <TextFieldFormsy
// 					className="mb-16"
// 					type="text"
// 					name={info.name}
// 					label={info.label}
// 					// value={params.id ? businessUnit.data.entityName : ''}
// 					validations={{
// 						minLength: 1
// 					}}
// 					validationErrors={{
// 						minLength: 'Min character length is 1'
// 					}}
// 					InputProps={{
// 						endAdornment: (
// 							<InputAdornment position="end">
// 								<Icon className="text-20" color="action">
// 									{info.icon}
// 								</Icon>
// 							</InputAdornment>
// 						)
// 					}}
// 					variant="outlined"
// 					required
// 				/>
//   })

// 	return (
// 		<div className="w-full">
// 			<Formsy
// 				onValidSubmit={handleSubmit}
// 				onValid={enableButton}
// 				onInvalid={disableButton}
// 				ref={formRef}
// 				className="flex flex-col justify-center w-full"
// 			>
//         {TextField}

// 				<Button
// 					type="submit"
// 					variant="contained"
// 					color="primary"
// 					className="w-full mx-auto mt-16 normal-case"
// 					aria-label="REGISTER"
// 					// disabled={!isFormValid || businessUnit.loading}
// 					value="legacy"
// 				>
// 					{params.id ? 'Update' : 'Save'}
// 				</Button>
// 			</Formsy>
// 		</div>
// 	);
// }

// export default BusinessUnitTab;
