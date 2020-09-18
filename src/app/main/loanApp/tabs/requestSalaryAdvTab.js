import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
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
import CurrencyInput from 'app/shared/TextInput/CurrencyInput';
import { formatToNaira } from 'utils/formatNumber';

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
	const [amount, setAmount] = useState('');
	const [netSalary, setNetSalary] = useState('');

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	const salaryAdvance = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvance);

	const details = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvances.details);

	const profile = useSelector(({ profile }) => profile);
	const employeeList = useSelector(({ employeeList }) => employeeList);

	const employees = useSelector(({ employees}) => employees.employees.data );

	const { id } = useParams();

	const history = useHistory();

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

	useEffect(() => {
		if(id && details.salaryAdvanceData) {
			setSupportDirector(details && details.salaryAdvanceData.supportDirector);
			setFinanceManager(details && details.salaryAdvanceData.financeManager);
			setNetSalary(details.salaryAdvanceData.netSalary);
			setAmount(details.salaryAdvanceData.amount);
		}
	}, [id, details]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		if(id) {
			dispatch(Actions.updateSalaryAdvance(id, {
				...model,
				amount,
				netSalary,
				supportDirector,
				financeManager,
				supervisor: 1,
			}));
		} else {
			dispatch(Actions.applySalaryAdvance({
				...model,
				amount,
				netSalary,
				supportDirector,
				financeManager,
				supervisor: 1
			}, history));
		}
		
	}
	
	const isInput = () => supportDirector && financeManager;
  

	if(id) {
		if(Object.entries(details).length === 0) {
			return (
				<>Loading...</>
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
					<CurrencyInput
						values={id ? details.salaryAdvanceData.netSalary : ''}
						handleChange={e => setNetSalary(e.target.value)}
						name={"netSalary"}
						label={"Net Salary"}
						error={''}
						helperText={''}
					/>
				</div>
				<div>
					<CurrencyInput
						values={id ? details.salaryAdvanceData.amount : ''}
						handleChange={e => setAmount(e.target.value)}
						name={"amount"}
						label={"Amount requested"}
						error={amount > netSalary / 2.5}
						helperText={amount > netSalary / 2.5 ? 'Please you can not request for an amount that is greater than your net salary': `Max amount: ${formatToNaira(netSalary / 2.5)}`}
					/>
				</div>
		
				<AutoCompleteInput data={employees && formatDataList(employees)} inputs={{label: 'Director of support service'}} setInput={setSupportDirector} value={id ? {name: details.supportDirector, id: details.salaryAdvanceData.supportDirector} : {}}/>

				<AutoCompleteInput data={employees && formatDataList(employees)} inputs={{label: 'Finance manager'}} setInput={setFinanceManager} value={ id ? {name: details.financeManager, id: details.salaryAdvanceData.financeManager} : {}}/>

				</GridSystem>
				{id ? <ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content='Update Request' disable={!isFormValid}/> : <ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content='Request' disable={!isFormValid}/>}
			</Formsy>
		</div>
	);
};


withReducer('employeeList', employeeReducer)(RequestSalaryAdvTab);
withReducer('employees', employeesReducers)(RequestSalaryAdvTab)
export default RequestSalaryAdvTab;
