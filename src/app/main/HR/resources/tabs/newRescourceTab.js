import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import { useDeepCompareEffect } from '@fuse/hooks';
import ProgressBtn from 'app/shared/progressBtn';

function NewResourceTab(props) {
	const dispatch = useDispatch();
  const resources = useSelector(({ resource }) => resource.resource);
  const routeParams = useParams();
  const [name, setName] = React.useState('');
	const [update, setUpdate] = useState(false);
	const history = useHistory();

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
        dispatch(Actions.getResources());
        setName('')
			} else {
        dispatch(Actions.getOneResources(id));
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

	

	useEffect(() => {
		if(resources.success) {
			formRef.current.reset();
		}
	}, [resources.success])

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full m-16"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="name"
          label="Resources name"
          value={!resources.data.name ? '' : resources.data.name}
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

				{/* <Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					disabled={!isFormValid}
					value="legacy"
				>
					{update ? 'Update' : 'Create'}
				</Button> */}

				<ProgressBtn success={resources.success} loading={resources.loading} content={update ? 'Update' : 'Create'} disable={!isFormValid}/>
			</Formsy>
		</div>
	);
}

export default NewResourceTab;
