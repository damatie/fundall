import Formsy from 'formsy-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import employeeReducer from 'app/store/reducers';
import * as employeeActions from 'app/store/actions';
import GridSystem from 'app/shared/gridSystem';
import employeesReducers from 'app/main/HR/employee_management/store/reducers';
import * as employeesActions from 'app/main/HR/employee_management/store/actions';
import CurrencyInput from 'app/shared/TextInput/CurrencyInput';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { DatePicker } from '@material-ui/pickers';

// import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
// import { formatDataList } from 'utils/formatData';

// import { formatToNaira } from 'utils/formatNumber';
// import Input from 'app/shared/TextInput/Input';

// import { formateDate } from 'app/shared/formateDate';
// import CustomIconButton from 'app/shared/button/CustomIconButton';

import { Grid, TextField } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse/core/formsy';
import SharedDropzone from 'app/shared/sharedDropZone';
// import { DateTimePicker } from '@material-ui/pickers';

// const matchRole = (data, role) => {
// 	const arr = [];
// 	for (const i of data) {
// 		if (i.role.name === role) {
// 			arr.push(i);
// 		}
// 	}
// 	return arr;
// };

function RequestSalaryAdvTab(props) {
	const dispatch = useDispatch();

	const [amount, setAmount] = useState('');
	const [repaymentDate, setRepaymentDate] = useState(moment(new Date()));
	const [fileInput, setFileInput] = useState("");

	const [isFormValid, setIsFormValid] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const formRef = useRef(null);

	const salaryAdvance = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvance);
	const details = props.details;

	const profile = useSelector(({ profile }) => profile);

	// const employeeList = useSelector(({ employeeList }) => employeeList);
	// const employees = useSelector(({ employees }) => employees.employees.data);

	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		// if(!profile.loading) {
		dispatch(employeeActions.getDepartmentEmployees(profile.data.departmentId));
		// }
		dispatch(employeesActions.getEmployees());
	}, [profile.data, dispatch]);

	useEffect(() => {
		if (profile.data?.id) {
			setShowDetails(true);
		}
	}, [showDetails, profile]);

	useEffect(() => {
		if (details && id) {
			setAmount(details?.salaryAdvanceData?.amount);
			setRepaymentDate(moment(details?.salaryAdvanceData?.repaymentDate, 'YYYY-MM-DD'));
		}
	}, [details, id]);

	function enableButton() {
		setIsFormValid(true);
	}

	// useEffect(() => {
	// 	if (details && id) {
	// 		if (amount > details?.salaryAdvanceData?.amount) {
	// 			disableButton();
	// 		}
	// 	}
	// }, [amount])

	function disableButton() {
		setIsFormValid(false);
	}

	function handleSubmit(model) {
		model.amount = Number(amount);
		model.repaymentDate = repaymentDate.format("YYYY-MM-DD");
		// console.log(model)
		if (id && !location.state) {
			dispatch(Actions.updateSalaryAdvance(id, model, fileInput[0], history));
		}
		else if (id && location.state) {
			let role = location.state;
			role = role.toLowerCase().split(" ").join("");
			if (role === 'financemanager') {
				role = 'finance'
			}
			dispatch(Actions.updateSalaryAdvanceByRole(id, model, fileInput[0], role, history))
		}
		else if (!id && !location.state) {
			dispatch(Actions.applySalaryAdvance(model, fileInput[0], history));
		}
	}

	return useMemo(() => (
		<div className="w-full">
			{
				showDetails ?
					<Formsy
						onValidSubmit={handleSubmit}
						// onValid={enableButton}
						onInvalid={disableButton}
						ref={formRef}
						className="flex flex-col justify-center w-full"
					>
						<GridSystem>
							<div>
								<Typography variant='body1' className="mt-16 mb-8">Amount Requested *</Typography>
								<CurrencyInput
									values={amount}
									handleChange={e => setAmount(e.target.value)}
									name={"amount"}
									helperText={amount > details?.salaryAdvanceData?.amount ? 'Please you can not request for an amount that is greater than the amount requested' : `Max Amount: ${new Intl.NumberFormat().format(details?.salaryAdvanceData?.amount)}`}
									error={amount > details?.salaryAdvanceData?.amount}
									required
								/>
							</div>

							{/* <div>
								<TextFieldFormsy
									className="w-full"
									variant="outlined"
									label="Repayment Date"
									type="date"
									name={"repaymentDate"}
									required
								/>
							</div> */}
							<div>
								<Typography variant='body1' className="mt-16 mb-8">Repayment Date *</Typography>
								<DatePicker
									inputVariant="outlined"
									value={repaymentDate}
									onChange={date => setRepaymentDate(date)}
									className="mt-8 mb-16 w-full"
									minDate={moment(new Date())}
									format={'MMMM Do, YYYY hh:mm a'}
								/>
							</div>
						</GridSystem>

						<Grid container spacing={3} className="mt-48">
							<Grid item lg={4}>
								<ProgressBtn content={"Download form"} />
							</Grid>
							<Grid item lg={4}>
								<SharedDropzone
									name={"Upload Signed document here"}
									allowedTypes={'image/*, application/*'}
									setValue={setFileInput}
								/>
							</Grid>
							<Grid item lg={4}>
								<ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loading} content={
									(id && amount && repaymentDate && fileInput.length > 0) ?
										location.state ?
											"Approve Request" :
											'Update Request' :
										"Send Request to Line Manager"
								} disable={(id && (amount <= details?.salaryAdvanceData?.amount) && repaymentDate && fileInput.length > 0) ? false : !isFormValid} />
							</Grid>
						</Grid>

					</Formsy>
					:
					<p>loading...</p>
			}
		</div>
	), [details, showDetails, amount, repaymentDate, fileInput, salaryAdvance])
};


withReducer('employeeList', employeeReducer)(RequestSalaryAdvTab);
withReducer('employees', employeesReducers)(RequestSalaryAdvTab)

export default RequestSalaryAdvTab;