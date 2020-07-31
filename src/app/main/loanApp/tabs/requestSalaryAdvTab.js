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
import Typography from '@material-ui/core/Typography';
import GridSystem from 'app/shared/gridSystem';
import { useForm } from '@fuse/hooks';

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

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	const salaryAdvance = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvance);
	const profile = useSelector(({ profile }) => profile);
	const employeeList = useSelector(({ employeeList }) => employeeList);

	const { form, setForm, handleChange } = useForm({
		amount: 0,
		netSalary: 0
	})

	useEffect(() => {
		if(!profile.loading) {
			dispatch(employeeActions.getDepartmentEmployees(profile.data.departmentId));
    }
    // console.log(salaryAdvance)
	}, [profile.data]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(Actions.applySalaryAdvance(model))
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
				<GridSystem>
				<div>
					<TextFieldFormsy
						className="mb-16 w-full"
						type="number"
						name="amount"
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
						variant="outlined"
						required
					/>
					Amount: {new Intl.NumberFormat().format(form.amount)}
				</div>
				
				<div>
					<TextFieldFormsy
						className="mb-16 w-full"
						type="number"
						name="netSalary"
						label="Net Salary"
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
				<div style={{marginTop: '-10px'}}>
					<Typography variant="subtitle1" color="initial">Repayment Date</Typography>
					<TextFieldFormsy
						className="mb-16 w-full"
						type="date"
						name="repaymentDate"
						// label="Repayment Date"
						variant="outlined"
						required
					/>
				</div>

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
          name="supervisor"
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
				</GridSystem>
				<ProgressBtn success={salaryAdvance.success} loading={salaryAdvance.loadings} content='Request' disable={!isFormValid}/>
			</Formsy>
		</div>
	);
};


withReducer('employeeList', employeeReducer)(RequestSalaryAdvTab);
export default RequestSalaryAdvTab;
