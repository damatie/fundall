import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import withReducer from 'app/store/withReducer';
import { CircularProgress } from '@material-ui/core';
import * as Actions from '../store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import employeeReducer from 'app/store/reducers';
import * as employeeActions from 'app/store/actions';

const durations = [
  {value: '1 month', id: '1'},
  {value: '2 months', id: '2'},
  {value: '3 months', id: '3'},
  {value: '4 months', id: '4'},
  {value: '5 months', id: '5'},
  {value: '6 months', id: '6'},
];

const matchRole = (data, role) => {
	const arr = [];
	for(const i of data) {
		if(i.role.name === role) {
			arr.push(i);
		}
	}
	return arr;
}

function RequestLoanTab(props) {
	const dispatch = useDispatch();

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	const loan = useSelector(({ loan }) => loan.loan);
	const profile = useSelector(({ profile }) => profile);
	const employeeList = useSelector(({ employeeList }) => employeeList);

	useEffect(() => {
		if(!profile.loading) {
			dispatch(employeeActions.getDepartmentEmployees(profile.data.departmentId));
		}
	}, [profile.data]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		console.log(model);
		dispatch(Actions.applyLoan(model))
  }
  

	// if(leaveOption.success) {
	// 	return (
	// 		<Redirect to='/hr/leave_options' />
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
					type="number"
					name="amountRequested"
					label="Amount requested"
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
                  attach_money
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="number"
					name="deductableAmount"
					label="Deductable amount"
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
                  attach_money
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
					name="workLocation"
					label="Work location"
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
                  map
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<SelectFormsy
          className="my-16"
          name="duration"
          label="Duration"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
					required
        >
					{durations.map(item => (
						<MenuItem value={item.id} key={item.id}>{item.value}</MenuItem>
					))}
        </SelectFormsy>

        <SelectFormsy
          className="my-16"
          name="employementType"
          label="Employement type"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
					required
        >
					{['full-time', 'part-time', 'contract'].map(item => (
						<MenuItem value={item} key={item}>{item}</MenuItem>
					))}
        </SelectFormsy>

				<SelectFormsy
          className="my-16"
          name="financeManager"
          label="Finance manager"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
					required
        >
					{matchRole(employeeList.data, 'Finance manager').map(item => (
						<MenuItem value={item.id} key={item.id}>{`${item.firstName} ${item.lastName}`}</MenuItem>
					))}
        </SelectFormsy>

				<SelectFormsy
          className="my-16"
          name="departmentHead"
          label="Head of department"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
					required
        >
					{matchRole(employeeList.data, 'Head of department').map(item => (
						<MenuItem value={item.id} key={item.id}>{`${item.firstName} ${item.lastName}`}</MenuItem>
					))}
        </SelectFormsy>

				<SelectFormsy
          className="my-16"
          name="hrManager"
          label="HR manager"
          value="none"
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
					required
        >
					{matchRole(employeeList.data, 'HR').map(item => (
						<MenuItem value={item.id} key={item.id}>{`${item.firstName} ${item.lastName}`}</MenuItem>
					))}
        </SelectFormsy>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="purpose"
          label="Purpose"
          rows='5'
          multiline
					validations={{
						minLength: 1
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
                  description
								</Icon>
							</InputAdornment>
						)
					}}
          variant="outlined"
				/>
				<ProgressBtn success={loan.success} loading={loan.loadings} content='Request' disable={!isFormValid}/>
			</Formsy>
		</div>
	);
};


withReducer('employeeList', employeeReducer)(RequestLoanTab);
export default RequestLoanTab;
