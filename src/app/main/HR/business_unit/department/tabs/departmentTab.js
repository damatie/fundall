import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import ProgressBtn from 'app/shared/progressBtn';

function DepartmentTab(props) {
	const dispatch = useDispatch();
	const department = useSelector(({ department }) => department.department);
	const params = useParams();

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	const { departmentId } = useParams();

	useEffect(() => {
		console.log(department);
	}, [department]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		if(departmentId) {
			dispatch(Actions.updateDepartment(departmentId, {
				...model,
				entityId: department.data.entityId
			}));
		} else {
			dispatch(Actions.saveDepartment(model, params.id));
		}
		
	}

	if(department.success) {
		if(!departmentId) {
			return (
				<Redirect to={`/hr/business_unit/details/${params.id}`} />
			);
		}
		
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
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="departmentName"
					label="Department name"
					value={departmentId ? department.data.departmentName : ''}
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
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="departmentCode"
					label="Department code"
					value={departmentId ? department.data.departmentCode : ''}
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
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				{/* <TextFieldFormsy
					className="mb-16"
					type="text"
					name="departmentHead"
					label="Department head"
					value={departmentId ? department.data.departmentHead : ''}
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
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/> */}

				<TextFieldFormsy
					className="mb-16"
					type="date"
					name="startedOn"
					label="Started On"
					variant="outlined"
					value={departmentId ? department.data.startedOn : '' }
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="location"
					label="Location"
					value={departmentId ? department.data.location : ''}
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
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="description"
          label="Description"
          multiline
					rows='5'
					value={departmentId ? department.data.description : ''}
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
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<ProgressBtn content={departmentId ? 'Update' : 'Save'} disable={!isFormValid}/>
			</Formsy>
		</div>
	);
}

export default DepartmentTab;
