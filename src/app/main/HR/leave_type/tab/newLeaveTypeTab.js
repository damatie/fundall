import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import GridSystem from 'app/shared/gridSystem';

const getValue = (update, key, data) => {
	if (update) {
		if (data[key] === 'no') {
			return 'no'
		}
		return true
	}
	return 'none'
}
function NewLeaveTypeTab(props) {
	const dispatch = useDispatch();
	const leaveType = useSelector(({ leaveType }) => leaveType.leaveType);

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);
	const { push } = useHistory();


	useEffect(() => {
		// if (register.error && (register.error.username || register.error.password || register.error.email)) {
		// 	formRef.current.updateInputsWithError({
		// 		...register.error
		// 	});
		// 	disableButton();
		// }
		console.log(leaveType);
	}, []);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(value) {
		const model = {
			...value,
			isDeductible: value.isDeductible === 'no' ? false : value.isDeductible,
			isPreAllocated: value.isPreAllocated === 'no' ? false : value.isPreAllocated
		}
		if (props.update) {
			return dispatch(Actions.updateLeaveTypes({
				id: props.update,
				push,
				model
			}))
		}
		dispatch(Actions.saveLeaveTypes(model, push));
	}

	if (leaveType.success) {
		return (
			<Redirect to='/hr/leave_type' />
		);
	}

	return (
		<div className="w-full">
			{
				leaveType.loading && props.update ? <>loading...</> :
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
								name="type"
								label="Leave type"
								value={props.update && leaveType.data.type}
								validations={{
									minLength: 4
								}}
								validationErrors={{
									minLength: 'Min character length is 4'
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
								name="shortCode"
								label="Leave short code"
								value={props.update && leaveType.data.shortCode}
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

							<SelectFormsy
								className="my-16"
								name="isDeductible"
								label="Is Deductible"
								value={getValue(props.update, 'isDeductible', leaveType.data)}
								// validations="not-equals:none"
								validationError="requried"
								variant="outlined"
								required
							>
								<MenuItem value={true}>Yes</MenuItem>
								<MenuItem value={'no'}>No</MenuItem>
							</SelectFormsy>


							<SelectFormsy
								className="my-16"
								name="isPreAllocated"
								label="Is PreAllocated"
								value={getValue(props.update, 'isPreAllocated', leaveType.data)}
								// validations="not-equals:none"
								validationError="requried"
								variant="outlined"
								required
							>
								<MenuItem value={true}>Yes</MenuItem>
								<MenuItem value={'no'}>No</MenuItem>
							</SelectFormsy>

							<TextFieldFormsy
								className="mb-16"
								type="number"
								name="noOfDays"
								label="Number of days"
								value={props.update && Number(leaveType.data.noOfDays)}
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
								value={props.update && leaveType.data.description}
								rows="5"
								multiline
								validations={{
									minLength: 1
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
							/>
						</GridSystem>


						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="w-full mx-auto mt-16 normal-case"
							aria-label="REGISTER"
							disabled={!isFormValid}
							value="legacy"
						>
							Save
				</Button>
					</Formsy>
			}
		</div>
	);
}

export default NewLeaveTypeTab;
