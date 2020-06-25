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
import { months, days } from 'data';

function NewLeaveOptionTab(props) {
	const dispatch = useDispatch();
	const leaveOption = useSelector(({ leaveOption }) => leaveOption.leaveOption);

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
		dispatch(Actions.saveLeaveOptions(model));
	}

	if(leaveOption.success) {
		return (
			<Redirect to='/hr/leave_options' />
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
        <SelectFormsy
          className="my-16"
          name="businessUnit"
          label="Business unit"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
          required
        >
          <MenuItem value="yes">5cee</MenuItem>
          <MenuItem value="no">Cbit</MenuItem>
        </SelectFormsy>

        <SelectFormsy
          className="my-16"
          name="department"
          label="Department"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
          required
        >
          <MenuItem value="yes">Accounting</MenuItem>
          <MenuItem value="no">Human resources</MenuItem>
        </SelectFormsy>

        <SelectFormsy
          className="my-16"
          name="startMonth"
          label="Start month"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
          required
        >
          {months.map((data, i) => (
            <MenuItem value={data} key={i}>{data}</MenuItem>
          ))}
        </SelectFormsy>

      
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="workingHours"
					label="Working hours"
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
          name="halfDayRequests"
          label="Half day request"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
          required
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </SelectFormsy>


        <SelectFormsy
          className="my-16"
          name="skipHoliday"
          label="Skip holidays"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
          required
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </SelectFormsy>

        <SelectFormsy
          className="my-16"
          name="allowLeaveTransfer"
          label="Allow leave transfer"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
          required
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </SelectFormsy>

        <SelectFormsy
          className="my-16"
          name="selectWeekendStartDay"
          label=" Weekend start day"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
          required
        >
          {days.map((data, i) => (
            <MenuItem value={data} key={i}>{data}</MenuItem>
          ))}
        </SelectFormsy>

        <SelectFormsy
          className="my-16"
          name="selectWeekendEndDay"
          label=" Weekend end day"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
          required
        >
          {days.map((data, i) => (
            <MenuItem value={data} key={i}>{data}</MenuItem>
          ))}
        </SelectFormsy>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="hrManager"
					label="Hr manager"
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
          rows='5'
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

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					disabled={!isFormValid || leaveOption.loading}
					value="legacy"
				>
					Save
				</Button>
			</Formsy>
		</div>
	);
}

export default NewLeaveOptionTab;
