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

  const personalInfos = [
    { label: 'Surname', name: 'surname', icon: 'person' },
    { label: 'FirstName', name: 'surname', icon: 'person' },
    { label: 'Residential Adress', name: 'address', icon: 'person' },
    { label: 'City of residence', name: 'city', icon: 'person' },
    { label: 'Nearest airport to residence', name: 'airport', icon: 'person' },
    { label: 'County', name: 'county', icon: 'person' },
    { label: 'Zip code', name: 'zipcode', icon: 'person' },
    { label: 'Country', name: 'country', icon: 'person' },
    { label: 'Employee state of Origin', name: 'stateOfOrigin', icon: 'person' },
    { label: 'Employee L.G.A', name: 'lga', icon: 'person' },
    { label: 'Employee Nationality', name: 'nationality', icon: 'person' },
    { label: 'Employee DOB', name: 'dob', icon: 'person' },
    { label: 'Employee Intl passport number / experation date', name: 'passport', icon: 'person' },
    { label: 'Employee SRG entity', name: 'srg', icon: 'person' },
  ];
  
  const TextField = personalInfos.map((info) => {
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
