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
import makeStyles from '@material-ui/core/styles/makeStyles';
import GridSystem from 'app/shared/gridSystem';
import { useFormValues } from 'app/hooks/useFromValues';
import { getOneInput } from '../getOneInput';
import employeesReducers from 'app/main/HR/employee_management/store/reducers';
import * as employeesActions from 'app/main/HR/employee_management/store/actions';

const useStyles = makeStyles(theme => ({
	grid: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridGap: 20
	}
}));

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
		if(role !== 'Head of department') {
			if(i.role.name.toLowerCase() === role.toLowerCase()) {
				arr.push(i);
			}
		}else {
			if(i.role.name.toLowerCase() === 'line managers' || i.role.name.toLowerCase() === 'line manager' || i.role.name.toLowerCase() === role.toLowerCase()) {
				arr.push(i);
			}
		}
		
	}
	return arr;
}

function RequestLoanTab(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [isFormValid, setIsFormValid] = useState(true);
	const annualRef = useRef(null);
	const formRef = useRef(null);
	const [amountRequested, setAmountRequested] = useState(0);
	const [annualPay, setAnnualPay] = useState(0);

	const { inputs, setInputs } = useFormValues();

	const { id } = useParams();

	const loan = useSelector(({ loan }) => loan.loan);
	const profile = useSelector(({ profile }) => profile);
	const employeeList = useSelector(({ employeeList }) => employeeList);
	const employees = useSelector(({ employees}) => employees.employees.data )

	useEffect(() => {
		if(!profile.loading) {
			dispatch(employeeActions.getDepartmentEmployees(profile.data.departmentId));
			dispatch(employeesActions.getEmployees());
		}
	}, [profile.data]);

	useEffect(() => {
		if(id) {
			dispatch(Actions.getLoan(id));
		}
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
				<GridSystem>
				<div>
				<TextFieldFormsy
					className="mb-8 w-full"
					type="number"
					name="annualPay"
					label="Annual Pay"
					value={id ? loan.data.loanData.annualPay : ''}
					ref={annualRef}
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					error={annualPay > 3000000}
					onChange={e => setAnnualPay(e.target.value)}
					helperText={annualPay > 3000000 ? `Please you have exceed you maximum amount of ${Intl.NumberFormat().format(3000000)}` : ''}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
                  money
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
					<div>Annual Pay: {new Intl.NumberFormat().format(annualPay)}</div>
				</div>
				<div style={{width: '100%'}}>
					<TextFieldFormsy
						className="mb-8 w-full"
						type="number"
						name="amountRequested"
						label="Amount requested"
						step="1"
						value={id ? loan.data.loanData.amountRequested : ''}
						validations={{
							// matchRegexp: /^([1-20])$/
							// isGreaterThan: annualRef.current ? annualRef.current.state.value : 1
						}}
						error={amountRequested > annualPay * 20 / 100}
						helperText={amountRequested > annualPay * 20 / 100 ? 'Please you can not request for an amount that is greater than 20% of your annual payment' : `Max Amount: ${new Intl.NumberFormat().format(annualPay * 20 / 100)}`}
						onChange={e => {
							setAmountRequested(e.target.value)
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
									money
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>
					<div>{`Amount Requested: ${new Intl.NumberFormat().format(amountRequested)}`}</div>
				</div>

        <TextFieldFormsy
					className="mb-16"
					type="text"
					name="workLocation"
					label="Work location"
					value={id ? loan.data.loanData.workLocation : ''}
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

				<TextFieldFormsy
					className="mb-16"
					type="number"
					name="phoneNumber"
					label="Phone number"
					value={id ? loan.data.loanData.phoneNumber : ''}
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
									phone
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
					name="residentialAddress"
					label="Residential address"
					value={id ? loan.data.loanData.residentialAddress : ''}
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
									home
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
          label="Purpose Duration"
          value={id ? loan.data.loanData.duration : 'none'}
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
          name="departmentHead"
          label="Line manager"
          value={id ? loan.data.loanData.departmentHead : 'none'}
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
          name="supportDirector"
          label="Director of support service"
          value={id ? loan.data.loanData.supportDirector : 'none'}
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
					required
        >
					{matchRole(employeeList.data, 'HR').map(item => (
						<MenuItem value={item.id} key={item.id}>{`${item.firstName} ${item.lastName}`}</MenuItem>
					))}
        </SelectFormsy>
				<SelectFormsy
          className="my-16"
          name="financeManager"
          label="Finance manager"
          value={id ? loan.data.loanData.financeManager : 'none'}
          // validations="not-equals:none"
          validationError="requried"
          variant="outlined"
					required
        >
					{matchRole(employeeList.data, 'Finance manager').map(item => (
						<MenuItem value={item.id} key={item.id}>{`${item.firstName} ${item.lastName}`}</MenuItem>
					))}
        </SelectFormsy>
				<TextFieldFormsy
					className="my-16"
					type="text"
					name="purpose"
          label="Purpose"
          rows='5'
					multiline
					value={id ? loan.data.loanData.purpose : ''}
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
				</GridSystem>
				{id ? <></> : <ProgressBtn success={loan.success} loading={loan.loadings} content='Request Loan' disable={!isFormValid}/>}

				{loan.data.status === 'pending' ? <ProgressBtn success={loan.success} loading={loan.updating} content='Update Request' disable={!isFormValid}/> : <></>}
			</Formsy>
		</div>
	);
};


withReducer('employeeList', employeeReducer)(RequestLoanTab);
withReducer('employees', employeesReducers)(RequestLoanTab)
export default RequestLoanTab;
