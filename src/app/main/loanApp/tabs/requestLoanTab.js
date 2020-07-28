import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import withReducer from 'app/store/withReducer';
import { CircularProgress } from '@material-ui/core';
import * as Actions from '../store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import employeeReducer from 'app/store/reducers';
import * as employeeActions from 'app/store/actions';

const durations = [
  {value: '1 month', id: 1},
  {value: '2 months', id: 2},
  {value: '3 months', id: 3},
  {value: '4 months', id: 4},
  {value: '5 months', id: 5},
  {value: '6 months', id: 6},
];

const getData = (id, type) => {
	switch(type) {
		case 'duration': {
			for(let i of durations) {
				if(id === i.id) {
					return i.value;
				}
			}
		}
	}
}

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

	const { id } = useParams();

	const loan = useSelector(({ loan }) => loan.loan);
	const profile = useSelector(({ profile }) => profile);
	const employeeList = useSelector(({ employeeList }) => employeeList);

	useEffect(() => {
		if(!profile.loading) {
			dispatch(employeeActions.getDepartmentEmployees(profile.data.departmentId));
		}
	}, [profile.data]);

	useEffect(() => {
		if(id) {
			dispatch(Actions.getLoan(id));
		}
		console.log(id)
	}, [id])

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		console.log(model);
		dispatch(Actions.applyLoan(model))
		if(id) {
			dispatch(Actions.updateLoan(id, model));
		}
  }
	
	if(id) {
		if(loan.loading) {
			return (
				<>Loading... </>
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
					type="number"
					name="annualPay"
					label="Annual Pay"
					value={id ? loan.data.annualPay : ''}
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
					name="amountRequested"
					label="Amount requested"
					value={id ? loan.data.amountRequested : ''}
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
					value={id ? loan.data.deductableAmount : ''}
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
					value={id ? loan.data.workLocation : ''}
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
          value={id ? loan.data.duration : 'none'}
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
          value={id ? loan.data.employementType : 'none'}
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
          value={id ? loan.data.financeManager : 'none'}
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
          value={id ? loan.data.departmentHead : 'none'}
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
          value={id ? loan.data.hrManager : 'none'}
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
					value={id ? loan.data.purpose : ''}
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
				{id ? <></> : <ProgressBtn success={loan.success} loading={loan.loadings} content='Request' disable={!isFormValid}/>}

				{loan.data.status === 'pending' ? <ProgressBtn success={loan.success} loading={loan.updating} content='Update Request' disable={!isFormValid}/> : <></>}
			</Formsy>
		</div>
	);
};


withReducer('employeeList', employeeReducer)(RequestLoanTab);
export default RequestLoanTab;
