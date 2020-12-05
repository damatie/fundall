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

// import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
// import { formatDataList } from 'utils/formatData';

// import { formatToNaira } from 'utils/formatNumber';
// import Input from 'app/shared/TextInput/Input';

// import { formateDate } from 'app/shared/formateDate';
// import CustomIconButton from 'app/shared/button/CustomIconButton';

import { Grid, TextField } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse/core/formsy';
import SharedDropzone from 'app/shared/sharedDropZone';
import { DateTimePicker } from '@material-ui/pickers';

const matchRole = (data, role) => {
	const arr = [];
	for (const i of data) {
		if (i.role.name === role) {
			arr.push(i);
		}
	}
	return arr;
};

function RequestSalaryAdvTab(props) {
	const dispatch = useDispatch();

	const [amount, setAmount] = useState('');
	const [repaymentDate, setRepaymentDate] = useState('');
	const [fileInput, setFileInput] = useState("");

	const [isFormValid, setIsFormValid] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const formRef = useRef(null);

	const salaryAdvance = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvance);
	const details = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvances?.details);

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
		if (id) {
			dispatch(Actions.getSalaryAdvanceDetails(id));
		}
	}, [id, dispatch]);

	useEffect(() => {
		if (id && details?.data?.salaryAdvanceData) {
			setAmount(details.data?.salaryAdvanceData.amount);
		}
	}, [id, details, amount]);

	useEffect(() => {
	}, [amount, fileInput])

	function enableButton() {
		setIsFormValid(true);
	}

	function disableButton() {
		setIsFormValid(false);
	}

	function handleSubmit(model) {
		model.amount = Number(amount);
		if (id && !location.state) {
			dispatch(Actions.updateSalaryAdvance(id, model, fileInput[0], history));
		}
		else if (id && location.state) {
			let role = location.state;
			role = role.toLowerCase().split(" ").join("");
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
						onValid={enableButton}
						onInvalid={disableButton}
						ref={formRef}
						className="flex flex-col justify-center w-full"
					>
						<GridSystem>
							<div>
								<CurrencyInput
									values={amount}
									handleChange={e => setAmount(e.target.value)}
									name={"amount"}
									label={"Amount requested"}
								/>
							</div>

							<div>
								<TextFieldFormsy
									className="w-full"
									variant="outlined"
									label="Repayment Date"
									type="date"
									name={"repaymentDate"}
									required
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
									id ?
										location.state ?
											"Approve Request" :
											'Update Request' :
										"Send Request to Line Manager"
								} disable={id ? false : !isFormValid} />
							</Grid>
						</Grid>

					</Formsy>
					:
					<p>loading...</p>
			}
		</div>
	), [details, showDetails, amount, fileInput, salaryAdvance])
};


withReducer('employeeList', employeeReducer)(RequestSalaryAdvTab);
withReducer('employees', employeesReducers)(RequestSalaryAdvTab)
export default RequestSalaryAdvTab;
