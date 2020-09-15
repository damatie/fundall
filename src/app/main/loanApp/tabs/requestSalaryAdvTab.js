import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import withReducer from 'app/store/withReducer';
import { CircularProgress } from '@material-ui/core';
import * as Actions from '../store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import employeeReducer from 'app/store/reducers';
import * as employeeActions from 'app/store/actions';
import Typography from '@material-ui/core/Typography';
import GridSystem from 'app/shared/gridSystem';
import { useForm } from '@fuse/hooks';
import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
import { formatDataList } from 'utils/formatData';
import employeesReducers from 'app/main/HR/employee_management/store/reducers';
import * as employeesActions from 'app/main/HR/employee_management/store/actions';

const matchRole = (data, role) => {
	const arr = [];
	for(const i of data) {
		if(i.role.name === role) {
			arr.push(i);
		}
	}
	return arr;
}

function RequestSalaryAdvTab(props) {
	const dispatch = useDispatch();

	const [supportDirector, setSupportDirector] = useState('');
	const [financeManager, setFinanceManager] = useState('');

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	const salaryAdvance = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvance);

	const details = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvances.details);

	const profile = useSelector(({ profile }) => profile);
	const employeeList = useSelector(({ employeeList }) => employeeList);

	const employees = useSelector(({ employees}) => employees.employees.data );

	const { id } = useParams();

	const { form, setForm, handleChange } = useForm({
		amount: 0,
		netSalary: 0,
		repaymentDate: '',
	})

	useEffect(() => {
		// if(!profile.loading) {
			dispatch(employeeActions.getDepartmentEmployees(profile.data.departmentId));
    // }
		// console.log(salaryAdvance)
		dispatch(employeesActions.getEmployees());
	}, [profile.data, dispatch]);

	useEffect(() => {
		if(id) {
			dispatch(Actions.getSalaryAdvanceDetails(id));
		}
	}, [id, dispatch]);



	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		if(id) {
			dispatch(Actions.updateSalaryAdvance(id, model));
		} else {
			dispatch(Actions.applySalaryAdvance({
				...model,
				supportDirector,
				financeManager,
				supervisor: 1
			}));
		}
		
	}
	
	const isInput = () => supportDirector && financeManager;
  

	// if(Object.entries(details).length === 0) {
	// 	return (
	// 		<>Loading...</>
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
				<GridSystem>
				<div>
					<TextFieldFormsy
						className="mb-16 w-full"
						type="number"
						name="netSalary"
						label="Net Salary"
						// value={id ? details.salaryAdvanceData.netSalary : ''}
						onChange={handleChange}
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
										money
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>
					Amount: {new Intl.NumberFormat().format(form.netSalary)}
				</div>
				<div>
					<TextFieldFormsy
						className="mb-16 w-full"
						type="number"
						name="amount"
						// value={id ? details.salaryAdvanceData.amount : ''}
						label="Amount requested"
						onChange={handleChange}
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
										money
									</Icon>
								</InputAdornment>
							)
						}}
						error={form.amount > form.netSalary / 2.5}
						helperText={form.amount > form.netSalary / 2.5 ? 'Please you can not request for an amount that is greater than your net salary': `Max amount: ${Intl.NumberFormat().format(form.netSalary / 2.5)}`}
						variant="outlined"
						required
					/>
					Amount: {new Intl.NumberFormat().format(form.amount)}
				</div>
			
				{/* <div style={{marginTop: '-10px'}}>
					<Typography variant="subtitle1" color="initial">Repayment Date</Typography>
					<TextFieldFormsy
						className="mb-16 w-full"
						type="date"
						value={id ? details.salaryAdvanceData.repaymentDate : ''}
						name="repaymentDate"
						// label="Repayment Date"
						variant="outlined"
						required
						onChange={handleChange}
						error={new Date(form.repaymentDate) <= new Date()}
						helperText={new Date(form.repaymentDate) <= new Date() ? 'please enter a date that is greater than todays date' : ''}
					/>
				</div> */}

				{/* <AutoCompleteInput data={employees && formatDataList(employees)} inputs={{label: 'Director of support service'}} setInput={setSupportDirector} value={{name: details.supportDirector, id: details.salaryAdvanceData.supportDirector}}/>

				<AutoCompleteInput data={employees && formatDataList(employees)} inputs={{label: 'Finance manager'}} setInput={setFinanceManager} value={{name: details.financeManager, id: details.salaryAdvanceData.financeManager}}/> */}

				</GridSystem>
				{id ? <ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content='Update Request' disable={!isFormValid}/> : <ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content='Request' disable={!isFormValid}/>}
			</Formsy>
		</div>
	);
};


withReducer('employeeList', employeeReducer)(RequestSalaryAdvTab);
withReducer('employees', employeesReducers)(RequestSalaryAdvTab)
export default RequestSalaryAdvTab;
