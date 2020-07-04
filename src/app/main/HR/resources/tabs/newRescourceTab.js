import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import { useDeepCompareEffect } from '@fuse/hooks';

function NewResourceTab(props) {
	const dispatch = useDispatch();
  // const role = useSelector(({ role }) => role.role);
  const routeParams = useParams();
  const [name, setName] = React.useState('');
  const [update, setUpdate] = useState(false);

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);
	const { id } = routeParams;

	useEffect(() => {
		// if (register.error && (register.error.username || register.error.password || register.error.email)) {
		// 	formRef.current.updateInputsWithError({
		// 		...register.error
		// 	});
		// 	disableButton();
    // }
  }, []);
  
  useDeepCompareEffect(() => {
		function updateProductState() {
			

			if (id === 'new') {
        // dispatch(Actions.newProduct());
        setName('')
			} else {
        // dispatch(Actions.getProduct(routeParams));
        setName('Employee management');
        setUpdate(true);
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		if(update) {
			dispatch(Actions.updateResourse(model, id));
		} else {
			dispatch(Actions.createResourse(model));
		}
	}

	// if(role.success) {
	// 	return (
	// 		<Redirect to='/hr/resources' />
	// 	);
	// }

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
          label="Resources name"
          value={name}
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
					disabled={!isFormValid}
					value="legacy"
				>
					{update ? 'Update' : 'Create'}
				</Button>
			</Formsy>
		</div>
	);
}

export default NewResourceTab;
