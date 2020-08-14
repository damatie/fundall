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

function BusinessUnitTab(props) {
	const dispatch = useDispatch();
	const businessUnit = useSelector(({ businessUnit }) => businessUnit.businessUnit);
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
		if(!params.id) {
			dispatch(Actions.saveBusinessUnit(model));
		} else {
			dispatch(Actions.updateEntity(params.id, model));
		}
		
	}

	if(businessUnit.success) {
		return (
			<Redirect to='/hr/business_unit' />
		);
	}

	if(params.id && !businessUnit.data) {
		return <div>Loading....</div>
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
					name="entityName"
					label="Business unit"
					value={params.id ? businessUnit.data.entityName : ''}
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
					name="code"
					label="Code"
					value={params.id ? businessUnit.data.code : ''}
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
					type="date"
					name="startedOn"
					label="Started On"
					variant="outlined"
					value={params.id ? new Date().toISOString().substring(0, 10) : '' }
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="location"
					label="Location"
					value={params.id ? businessUnit.data.location : ''}
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
					value={params.id ? businessUnit.data.description : ''}
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

				<ProgressBtn success={businessUnit.success} loading={businessUnit.loading} content={params.id ? 'Update' : 'Save'} disable={!isFormValid}/>
				
			</Formsy>
		</div>
	);
}

export default BusinessUnitTab;
