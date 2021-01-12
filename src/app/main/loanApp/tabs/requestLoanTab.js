import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
// import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import withReducer from 'app/store/withReducer';
// import { CircularProgress } from '@material-ui/core';
import * as Actions from '../store/actions';
import ProgressBtn from 'app/shared/progressBtn';
import employeeReducer from 'app/store/reducers';
import * as employeeActions from 'app/store/actions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import GridSystem from 'app/shared/gridSystem';
// import { useFormValues } from 'app/hooks/useFromValues';
// import { getOneInput } from '../getOneInput';
import employeesReducers from 'app/main/HR/employee_management/store/reducers';
import * as employeesActions from 'app/main/HR/employee_management/store/actions';
// import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
// import { formatDataList } from 'utils/formatData';
import CurrencyInput from 'app/shared/TextInput/CurrencyInput';
import PhoneNumberInput from 'app/shared/TextInput/PhoneNumberInput';
import { Grid } from '@material-ui/core';
import SharedDropzone from 'app/shared/sharedDropZone';

const useStyles = makeStyles(theme => ({
	grid: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridGap: 20
	}
}));

const durations = [
	{ value: '1 month', id: 1 },
	{ value: '2 months', id: 2 },
	{ value: '3 months', id: 3 },
	{ value: '4 months', id: 4 },
	{ value: '5 months', id: 5 },
	{ value: '6 months', id: 6 },
];


function RequestLoanTab(props) {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [error, setError] = useState(false);
	const [userCheck, setCheck] = useState(null);

	const [isFormValid, setIsFormValid] = useState(false);
	// const annualRef = useRef(null);
	const formRef = useRef(null);

	const [otherDetails, setOtherDetails] = useState({
		workPhone: "", mobilePhone: "", homePhone: "", annualPay: "",
		amountRequested: "", purpose: "", duration: "", email: ""
	});
	const [fileInput, setFileInput] = useState([]);

	// const isInput = () => supportDirector && departmentHead && financeManager;

	const { id } = useParams();
	const { state } = useLocation();

	useEffect(() => {
		//reload when the file comes in
	}, [fileInput])

	const loan = useSelector(state => state.loan.loan);
	const profile = useSelector(({ profile }) => profile);
	// const employeeList = useSelector(({ employeeList }) => employeeList);
	// const employees = useSelector(({ employees }) => employees.employees.data)

	useEffect(() => {
		if (!profile.loading) {
			dispatch(employeeActions.getDepartmentEmployees(profile.data.departmentId));
			dispatch(employeesActions.getEmployees());
		}
	}, [profile.data]);

	useEffect(() => {
		if (!fileInput[0] ||
			Object.values(otherDetails).includes("") ||
			(
				otherDetails.purpose.length < 10 ||
				otherDetails.workPhone.length < 14 ||
				otherDetails.homePhone.length < 14 ||
				otherDetails.mobilePhone.length < 14
			)
		) {
			setIsFormValid(false)
		} else {
			setIsFormValid(true)
		}
	}, [otherDetails, fileInput])

	useEffect(() => {
		if (id) {
			console.log(state)
			setOtherDetails({
				amountRequested: state.amountRequested,
				mobilePhone: state.mobilePhone,
				annualPay: state.annualPay,
				workPhone: state.workPhone,
				homePhone: state.homePhone,
				duration: state.duration,
				purpose: state.purpose,
				email: state.email
			});

			setCheck(state?.fromHR ? "hr" : state?.fromFM ? "fm" : null);
			return;
		}
	}, [id, state]);



	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	const handleOtherDetails = (value, key) => {
		setOtherDetails({ ...otherDetails, [key]: value });
	}

	function handleSubmit(model) {
		if (id) {
			if (userCheck === "hr") {
				dispatch(Actions.approveLoan({
					id, body: {
						...otherDetails,
						...model,
						loanForm: fileInput[0]
					},
					url: "/loan/approve/hr/",
					history
				}))
				return;
			}
			else if (userCheck === "fm") {
				dispatch(Actions.approveLoan({
					id, body: {
						...otherDetails,
						...model,
						loanForm: fileInput[0]
					},
					url: "/loan/approve/finance/",
					history
				}))

			}
			else {
				dispatch(Actions.updateLoan(id, {
					...otherDetails,
					...model,
					loanForm: fileInput[0]
				}, history, "hr"));
			}
		} else {
			dispatch(Actions.applyLoan({
				...otherDetails,
				...model,
				loanForm: fileInput[0],
			}, history));
		}
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				// onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<GridSystem className={"mb-24"}>
					<div style={{ width: '100%' }}>
						<CurrencyInput
							handleChange={e =>
								handleOtherDetails(e.target.value, "amountRequested")
							}
							defaultValue={otherDetails.amountRequested}
							values={otherDetails.amountRequested}
							helperText={otherDetails.amountRequested > otherDetails.annualPay * 20 / 100 ? 'Please you can not request for an amount that is greater than 20% of your annual payment' : `Max Amount: ${new Intl.NumberFormat().format(otherDetails.annualPay * 20 / 100)}`}
							error={otherDetails.amountRequested > otherDetails.annualPay * 20 / 100}
							name={"amountRequested"}
							label={"Amount requested"}
						/>
					</div>

					<div>
						<CurrencyInput
							handleChange={e => handleOtherDetails(e.target.value, "annualPay")}
							values={otherDetails.annualPay}
							helperText={otherDetails.annualPay > 3000000 ? `Please you have exceed you maximum amount of ${Intl.NumberFormat().format(3000000)}` : ''}
							error={otherDetails.annualPay > 3000000}
							name={"annualPay"}
							label={"Annual Pay"}
						/>
					</div>

					{
						state?.fromFM &&
						<div>
							<CurrencyInput
								handleChange={e => handleOtherDetails(e.target.value, "amountApproved")}
								values={otherDetails?.amountApproved ?? ""}
								name={"amountApproved"}
								label={"Amount Approved"}
							/>
						</div>
					}
					<TextFieldFormsy
						className="mb-16"
						type="text"
						name="purpose"
						label="Purpose"
						rows='5'
						required
						value={otherDetails.purpose}
						multiline
						// error={otherDetails.purpose?.length < 10 ? true : false}
						onChange={(e) => handleOtherDetails(e.target.value, "purpose")}
						// validations={{
						// 	minLength: 10
						// }}
						helperText={"must be more than 10 characters "}
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

					<SelectFormsy
						className="mb-16"
						name="duration"
						label="Purpose Duration"
						value={otherDetails.duration}
						onChange={(e) => handleOtherDetails(e.target.value, "duration")}
						// validations="not-equals:none"
						// validationError="requried"
						variant="outlined"
						required
					>
						{durations.map(item => (
							<MenuItem value={item.id} key={item.id}>{item.value}</MenuItem>
						))}
					</SelectFormsy>

					<TextFieldFormsy
						className="mb-16"
						type="email"
						name="email"
						label="Email address"
						value={otherDetails.email}
						onChange={(e) => handleOtherDetails(e.target.value, "email")}
						validations={{
							maxLength: 30
						}}

						validationErrors={{
							minLength: 'Max character length is 30'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										email
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<PhoneNumberInput
						required
						// setError={setError}
						value={otherDetails.workPhone}
						onChange={(e) => handleOtherDetails(e, "workPhone")}
						country={'ng'}
						placeholder={"Work Phone"}
					/>

					<PhoneNumberInput
						required
						// setError={setError}
						value={otherDetails.mobilePhone}
						onChange={(e) => handleOtherDetails(e, "mobilePhone")}
						country={'ng'}
						placeholder={"Mobile Phone"}
					/>

					<PhoneNumberInput
						required
						// setError={setError}
						value={otherDetails.homePhone}
						onChange={(e) => handleOtherDetails(e, "homePhone")}
						country={'ng'}
						placeholder={"Home Phone"}
						// validations={{
						// 	minLength: 10,
						// 	maxLength: 10
						// }}
						// validationErrors={{
						// 	minLength: 'Min character length is 10'
						// }}
					/>

					{/* 
					<TextFieldFormsy
						className="mb-16"
						type="text"
						name="workLocation"
						label="Work location"
						value={''}
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
					*/}

					{/* 
					<TextFieldFormsy
						className="mb-16"
						type="number"
						name="otherDetails"
						label="Phone number"
						value={''}
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
					*/}

					{/* 
					<AutoCompleteInput data={employees && formatDataList(employees, 'Line managers')} inputs={{ label: 'Line manager' }} setInput={setDepartmentHead} value={id ? { name: loan.data.departmentHead, id: loan.data.loanData.departmentHead } : {}} />
					<AutoCompleteInput data={employees && formatDataList(employees, 'Director of support service')} inputs={{ label: 'Director of support service' }} setInput={setSupportDirector} value={id ? { name: loan.data.supportDirector, id: loan.data.loanData.supportDirector } : {}} />
					<AutoCompleteInput data={employees && formatDataList(employees, 'Finance manager')} inputs={{ label: 'Finance manager' }} setInput={setFinanceManager} value={id ? { name: loan.data.financeManager, id: loan.data.loanData.financeManager } : {}} /> 
					*/}
				</GridSystem>

				<Grid container spacing={3} className="mt-24 mb-16 w-full">
					<Grid item lg={6}>
						<ProgressBtn content={"Download form"} disable={true} />
					</Grid>
					<Grid item lg={6}>
						<SharedDropzone
							name={"Upload Signed document here"}
							allowedTypes={'image/*, application/*'}
							setValue={setFileInput}
						/>
					</Grid>
				</Grid>

				{
					id ?
						<ProgressBtn success={loan.success} loading={loan.updating} content='Update Request' disable={!isFormValid || error} />
						:
						<ProgressBtn success={loan.success} loading={loan.loadings} content='Request Loan' disable={!isFormValid} />
				}

			</Formsy>
		</div>
	);
};


withReducer('employeeList', employeeReducer)(RequestLoanTab);
withReducer('employees', employeesReducers)(RequestLoanTab)
export default RequestLoanTab;