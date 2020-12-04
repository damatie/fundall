import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import employeeReducer from 'app/store/reducers';
import * as employeeActions from 'app/store/actions';
import GridSystem from 'app/shared/gridSystem';
import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
import { formatDataList } from 'utils/formatData';
import employeesReducers from 'app/main/HR/employee_management/store/reducers';
import * as employeesActions from 'app/main/HR/employee_management/store/actions';
import CurrencyInput from 'app/shared/TextInput/CurrencyInput';
import { formatToNaira } from 'utils/formatNumber';
import Input from 'app/shared/TextInput/Input';
import { Grid, TextField } from '@material-ui/core';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { formateDate } from 'app/shared/formateDate';
import SharedDropzone from 'app/shared/sharedDropZone';

const matchRole = (data, role) => {
	const arr = [];
	for (const i of data) {
		if (i.role.name === role) {
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

	const employees = useSelector(({ employees }) => employees.employees.data);

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
		if (id) {
			dispatch(Actions.getSalaryAdvanceDetails(id));
		}
	}, [id, dispatch]);

	useEffect(() => {
		if (id && details.salaryAdvanceData) {
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
		if (id) {
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


	if (id) {
		if (Object.entries(details).length === 0) {
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
							helperText={amount > netSalary / 2.5 ? 'Please you can not request for an amount that is greater than your net salary' : `Max amount: ${formatToNaira(netSalary / 2.5)}`}
						/>
					</div>

					<TextFieldFormsy
						className="mt-16 w-full"
						variant="outlined"
						type="date"
						name={"Repayment Date"}
						value={formateDate(new Date())}
						required
					/>
					<AutoCompleteInput data={employees && formatDataList(employees, 'Line manager')} inputs={{ label: 'Line manager' }} setInput={setFinanceManager} value={id ? { name: details.lineManager, id: details.salaryAdvanceData.lineManager } : {}} />
				</GridSystem>

				{true ?
					<Grid container spacing={3} className="mt-48">
						<Grid item lg={4}>
							<ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content={"Download form"} disable={!isFormValid} />
						</Grid>
						<Grid item lg={4}>
							<SharedDropzone name={"Upload Signed document here"} allowedTypes={'image/*'} setValue={(e) => { console.log(e) }} /> :
						{/* <ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content={id ? 'Update Request' : "Upload Form"} disable={!isFormValid} /> */}
						</Grid>
						<Grid item lg={4}>
							<ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content={id ? 'Update Request' : "Send Request to Line Manager"} disable={!isFormValid} />
						</Grid>
					</Grid>
					:
					<Grid container spacing={3} className="mt-48">
						<Grid item lg={4}>
							<ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content={"Download Request"} disable={!isFormValid} />
						</Grid>
						<Grid item lg={4}>
							<ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content={"Disburse Advance"} disable={!isFormValid} />
						</Grid>
						<Grid item lg={4}>
							<ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content={"Approve"} disable={!isFormValid} />
						</Grid>
					</Grid>
				}
			</Formsy>
		</div>
	);
};


withReducer('employeeList', employeeReducer)(RequestSalaryAdvTab);
withReducer('employees', employeesReducers)(RequestSalaryAdvTab)
export default RequestSalaryAdvTab;
