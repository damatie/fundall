import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import * as entityActions from 'app/main/HR/business_unit/store/actions';
import * as departmentActions from 'app/main/HR/business_unit/department/store/actions';
import * as rolesActions from 'app/main/HR/roles/store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';

function NewEmployeeTab(props) {
	const dispatch = useDispatch();
	const employee = useSelector(({ employees }) => employees.employee);
	const entity = useSelector(({ entity }) => entity.businessUnits);
	const department = useSelector(({ department }) => department.departments);
	const roles = useSelector(({ roles }) => roles.roles);

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	useEffect(() => {
		// if (register.error && (register.error.username || register.error.password || register.error.email)) {
		// 	formRef.current.updateInputsWithError({
		// 		...register.error
		// 	});
		// 	disableButton();
		// }
		dispatch(entityActions.getBusinessUnits());
		dispatch(rolesActions.getRoles());
	}, []);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(Actions.saveEmployee(model));
	}

	const getDepartments = id => {
		dispatch(departmentActions.getDepartments(id));
	}

	if(employee.success) {
		return (
			<Redirect to='/hr/employee_management' />
		);
	}

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
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="email"
					label="Email"
					validations="isEmail"
					validationErrors={{
						isEmail: 'Please enter a valid email'
					}}
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

				<SelectFormsy
					className="mb-16"
					name="entity"
					label="Entity"
					value=""
					variant="outlined"
					required
					requiredError='Must not be None'
					onChange={e => {
						getDepartments(e.target.value);
					}}
				>
					{entity.data.map(item => (
						<MenuItem value={item.id} key={item.id}>{item.entityName}</MenuItem>
					))}
				</SelectFormsy>

				<SelectFormsy
					className="mb-16"
					name="departmentId"
					label="Departments"
					value=""
					variant="outlined"
					required
					requiredError='Must not be None'
				>
					{department.data.map(item => (
						<MenuItem value={item.id} key={item.id}>{item.departmentName}</MenuItem>
					))}
				</SelectFormsy>

				<SelectFormsy
					className="mb-16"
					name="role"
					label="Employee role"
					value=""
					variant="outlined"
					required
					requiredError='Must not be None'
				>
					{roles.data.map(item => (
						<MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
					))}
				</SelectFormsy>
				</GridSystem>

				
				<ProgressBtn success={employee.success} loading={employee.loading} content='Save' disable={!isFormValid} />
			</Formsy>
		</div>
	);
}

export default NewEmployeeTab;
