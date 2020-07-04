import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';

function NewRolesTab(props) {
	const dispatch = useDispatch();
	const role = useSelector(({ role }) => role.role);

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
		dispatch(Actions.createRole(model));
	}

	if(role.success) {
		return (
			<Redirect to='/hr/roles' />
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
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="name"
					label="Role name"
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
                  folder_shared
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					disabled={!isFormValid || role.loading}
					value="legacy"
				>
					Create
				</Button>
			</Formsy>
		</div>
	);
}

export default NewRolesTab;
