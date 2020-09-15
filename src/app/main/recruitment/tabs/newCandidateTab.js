import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import * as entityActions from 'app/main/HR/business_unit/store/actions';
import * as departmentActions from 'app/main/HR/business_unit/department/store/actions';
import * as rolesActions from 'app/main/HR/roles/store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';
import DropZone from '../../../shared/sharedDropZone';
import withReducer from 'app/store/withReducer';
import * as reducers from '../store/reducers';

function AddCandidate(props) {
	const dispatch = useDispatch();

	const [file, setFile] = React.useState('');
	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	const candidate = useSelector(state => state.PositionDetails.candidate)

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(Actions.addCandidate({
			...model,
			resume: file[0],
			openPositionId: props.positionId
		}, props.positionId));
	}

	const getDepartments = id => {
		// dispatch(departmentActions.getDepartments(id));
	}

	const formInputs = [
		{name: 'candidateName', label: 'Candidate name', validations: '', icon: 'person', type: 'text'},
		{name: 'candidateEmail', label: 'Candidate email', validations: 'isEmail', icon: 'email', type: 'text'},
		{name: 'candidatePhoneNumber', label: 'Candidate phone Number', validations: '', icon: 'phone', type: 'text'},
		// {name: 'openPositionId', label: 'Open position', validations: '', icon: '', type: 'text'},
		{name: 'employeeStatus', label: 'Employee status', validations: '', icon: 'email', type: 'text'},
	];

	const recruitmentForm = formInputs.map((input, i) => {
			return (
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name={input.name}
					label={input.label}
					// validations="isEmail"
					// validationErrors={{
					// 	isEmail: 'Please enter a valid email'
					// }}
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
			)
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
					{ recruitmentForm }
				</GridSystem>
        <Typography variant='body1' className="mt-16 mb-8">Upload resume *</Typography>
        <DropZone setValue={setFile} />
				<ProgressBtn success={candidate.success} loading={candidate.loading} content='Create Opening' disable={!isFormValid || file.length === 0} />
			</Formsy>
		</div>
	);
}

export default withReducer('candidate', reducers)(AddCandidate);
