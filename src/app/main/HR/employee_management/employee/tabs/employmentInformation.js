import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
// import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';

function BusinessUnitTab(props) {
	const dispatch = useDispatch();
	// const businessUnit = useSelector(({ businessUnit }) => businessUnit.businessUnit);
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
  
  const employmentInfo = [
    { label: 'Employee Next of Kin details', name: 'nextOfKin', icon: 'person' },
    { label: 'Employee salary grade', name: 'salaryGrade', icon: 'person' },
    { label: 'Employee dependant details', name: 'dependantDetail', icon: 'person' },
    { label: 'Employee start date', name: 'startdate', icon: 'person' },
    { label: 'Employee exit date', name: 'exitdate', icon: 'person' },
    { label: 'Employee date of last promotion details', name: 'promotionDetails', icon: 'person' },
    { label: 'Compensation details', name: 'compensation', icon: 'person' },
    { label: 'Employee ID card number', name: 'idNumber', icon: 'person' },
    { label: 'Qualification', name: 'qualification', icon: 'person' },
    { label: 'Private Mobile Number', name: 'privateNumber', icon: 'person' },
    { label: 'Official number', name: 'officialNumber', icon: 'person' },
    { label: 'Office Line', name: 'officeLine', icon: 'person' },
    { label: 'Office extension', name: 'officeExtension', icon: 'person' },
    { label: 'Office email', name: 'officeEmail', icon: 'person' },
  ];
  
  const TextField = employmentInfo.map((info) => {
    return <TextFieldFormsy
					className="mb-16"
					type="text"
					name={info.name}
					label={info.label}
					// value={params.id ? businessUnit.data.entityName : ''}
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
        {TextField}

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
