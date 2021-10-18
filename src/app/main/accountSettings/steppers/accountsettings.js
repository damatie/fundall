import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from 'material-ui-chip-input';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import { FormHelperText } from '@material-ui/core';
import { setStepper } from '../components/setStepper';
import moment from 'moment-timezone';
import useAccountSettings from '../hooks/useAccountSettings';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
		overflowY: 'scroll',
		flexDirection: 'column',
		margin: '0rem auto',
		padding: '5rem',
		'& form': {
			width: '100%'
		}
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: 2
	}
}));

export default function AccountSettings({ handleNext }) {
	const dispatch = useDispatch();

	const {
		register,
		errors,
		handleSubmit,
		onSubmit,
		setValue,
		validate,
		timezones,
		dateFormats,
		currencies,
		accountSetting,
		setAcountSetting
	} = useAccountSettings({
		dispatch,
		handleNext
	});

	const classes = useStyles();
	// let localData = {};
	// React.useEffect(() => {
	//   setTimeZoneErr(errors.timeZone?.message);
	//   setDateFormatErr(errors.dateFormat?.message);
	//   setCurrenciesErr(errors.currencies?.message);
	//   setEmploymentStatusErr(errors.employmentStatus?.message);
	//   setModeOfEmploymentErr(errors.modeOfEmployment?.message);
	//   setLeaveTypesErr(errors.leaveTypes?.message);
	//   setTrainingCategoriesErr(errors.trainingCategories?.message);
	//   setCompensationSettingsErr(errors.compensationSettings?.message);
	//   setJobTitleErr(errors.jobTitle?.message);
	//   setEmployeeGradeErr(errors.employeeGrade?.message);
	//   setRoleErr(errors.role?.message);
	// }, [errors]);

	// const onSubmit = async (data) => {
	//     try {
	//       const form = { ...data }
	//       loading('processing...');
	//       const { data: { message  } } = await api.post('/account_settings', form);
	//       swal.fire({
	//         text: message,
	//         icon: 'success'
	//       });
	//       setStepper([], 1);
	//       const dataResponse = localStorage.getItem('login_data');
	//       const localData = JSON.parse(dataResponse);
	//       localData.company.regStep = 1;
	//       localStorage.setItem('login_data', JSON.stringify(localData));
	//       handleNext();
	//     } catch (e) {
	//       swal.fire({
	//         text: e?.message || 'Something went wrong',
	//         icon: 'error'
	//       })
	//     }
	// };

	return (
		<div className={classes.root}>
			<Typography variant="body1" style={{ fontWeight: 'bolder' }} color="initial" className="my-10">
				Account Settings
			</Typography>
			<form>
				<Grid container spacing={3} justify="space-between" align="center" style={{ marginBottom: '3rem' }}>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<InputLabel id="timeZone-label">Time Zone</InputLabel>
							<Select
								justify="left"
								align="left"
								labelId="timeZone-label"
								id="timeZone"
								name="timeZone"
								variant="outlined"
								value={accountSetting?.timeZone}
								error={errors.timeZone}
								message={errors.timeZone?.message}
								ref={register}
								onChange={ev => {
									register({ name: 'timeZone', type: 'custom' }, { required: true });
									setValue('timeZone', accountSetting?.timeZone);
									setAcountSetting({
										...accountSetting,
										timeZone: ev.target.value
									});
								}}
								label="Time Zone"
							>
								{moment.tz.names().map((item, index) => (
									<MenuItem key={`${item}-${index}`} value={item}>
										{item}
									</MenuItem>
								))}
							</Select>
							<FormHelperText style={{ color: 'red' }}>{errors.timeZone?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<InputLabel id="dateFormat-label">Date Format</InputLabel>
							<Select
								justify="left"
								align="left"
								labelId="dateFormat-label"
								id="dateFormat"
								name="dateFormat"
								variant="outlined"
								ref={register}
								error={errors?.dateFormat}
								message={errors?.dateFormat?.message}
								value={accountSetting?.dateFormat}
								onChange={ev => {
									setAcountSetting({
										...accountSetting,
										dateFormat: ev.target.value
									});
								}}
								label="Date Format"
							>
								{dateFormats.map((item, index) => (
									<MenuItem key={`${item.value}-${index}`} value={item.value}>
										{item.label}
									</MenuItem>
								))}
							</Select>
							<FormHelperText style={{ color: 'red' }}>{errors?.dateFormat?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<InputLabel id="currencies-label">Currencies (Mutliple Select)</InputLabel>
							<Select
								justify="left"
								align="left"
								multiple
								variant="outlined"
								labelId="currencies-label"
								id="currencies"
								name="currencies"
								ref={register}
								error={errors?.currencies}
								// message={errors?.currencies?.message}
								value={accountSetting?.currencies}
								onChange={ev => {
									console.log(accountSetting?.currencies);
									setAcountSetting({
										...accountSetting,
										currencies: ev.target.value
									});
								}}
								renderValue={selected => (
									<div>
										{selected?.map((value, index) => (
											<Chip key={`${value}-${index}`} label={value} className={classes.chip} />
										))}
									</div>
								)}
								label="Currencies (Mutliple Select)"
							>
								{currencies.map((item, index) => (
									<MenuItem key={`${item.cc}-${index}`} value={item.cc}>
										{item.label}
									</MenuItem>
								))}
							</Select>
							<FormHelperText style={{ color: 'red' }}>{errors?.currencies?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<ChipInput
								label="Employment Status (Separate with Comma / Enter)"
								name="employmentStatus"
								variant="outlined"
								newChipKeyCodes={[188]}
								style={{ width: '100%' }}
								error={errors?.employmentStatus}
								// message={errors.employmentStatus?.message}
								// helperText={errors.employmentStatus?.message}
								refs={register}
								allowDuplicates={false}
								value={accountSetting?.employmentStatus}
								onAdd={chip => {
									let items = accountSetting?.employmentStatus;
									items.push(chip);
									setAcountSetting({
										...accountSetting,
										employmentStatus: items
									});
								}}
								onDelete={(chip, index) => {
									setAcountSetting({
										...accountSetting,
										employmentStatus: accountSetting?.employmentStatus?.filter(chp => chp !== chip)
									});
								}}
							/>
							<FormHelperText style={{ color: 'red' }}>{errors.employmentStatus?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<ChipInput
								label="Mode Of Employment (Separate with Comma / Enter)"
								name="modeOfEmployment"
								variant="outlined"
								newChipKeyCodes={[188]}
								style={{ width: '100%' }}
								error={errors.modeOfEmployment}
								// message={errors.modeOfEmployment?.message}
								// helperText={errors.modeOfEmployment?.message}
								refs={register}
								allowDuplicates={false}
								value={accountSetting?.modeOfEmployment}
								onAdd={chip => {
									let items = accountSetting?.modeOfEmployment;
									items.push(chip);
									setAcountSetting({
										...accountSetting,
										modeOfEmployment: items
									});
								}}
								onDelete={(chip, index) => {
									setAcountSetting({
										...accountSetting,
										modeOfEmployment: accountSetting?.modeOfEmployment?.filter(chp => chp !== chip)
									});
								}}
							/>
							<FormHelperText style={{ color: 'red' }}>{errors.modeOfEmployment?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<ChipInput
								label="Leave Status (Separate with Comma / Enter)"
								name="leaveTypes"
								variant="outlined"
								newChipKeyCodes={[188]}
								style={{ width: '100%' }}
								error={errors.leaveTypes}
								// message={errors.leaveTypes?.message}
								// helperText={errors.leaveTypes?.message}
								refs={register}
								allowDuplicates={false}
								value={accountSetting?.leaveTypes}
								onAdd={chip => {
									let items = accountSetting?.leaveTypes;
									items.push(chip);
									setAcountSetting({
										...accountSetting,
										leaveTypes: items
									});
								}}
								onDelete={(chip, index) => {
									setAcountSetting({
										...accountSetting,
										leaveTypes: accountSetting?.leaveTypes?.filter(chp => chp !== chip)
									});
								}}
							/>
							<FormHelperText style={{ color: 'red' }}>{errors.leaveTypes?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<ChipInput
								label="Training Categories (Separate with Comma / Enter)"
								name="trainingCategories"
								variant="outlined"
								newChipKeyCodes={[188]}
								style={{ width: '100%' }}
								error={errors.trainingCategories}
								// message={errors.trainingCategories?.message}
								// helperText={errors.trainingCategories?.message}
								refs={register}
								allowDuplicates={false}
								value={accountSetting?.trainingCategories}
								onAdd={chip => {
									let items = accountSetting?.trainingCategories;
									items.push(chip);
									setAcountSetting({
										...accountSetting,
										trainingCategories: items
									});
								}}
								onDelete={(chip, index) => {
									setAcountSetting({
										...accountSetting,
										trainingCategories: accountSetting?.trainingCategories?.filter(chp => chp !== chip)
									});
								}}
							/>
							<FormHelperText style={{ color: 'red' }}>{errors.trainingCategories?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<ChipInput
								label="Role (Separate with Comma / Enter)"
								name="role"
								variant="outlined"
								newChipKeyCodes={[188]}
								style={{ width: '100%' }}
								error={errors.role}
								// message={errors.role?.message}
								// helperText={errors.role?.message}
								refs={register}
								allowDuplicates={false}
								value={accountSetting?.role}
								onAdd={chip => {
									let items = accountSetting?.role;
									items.push(chip);
									setAcountSetting({
										...accountSetting,
										role: items
									});
								}}
								onDelete={(chip, index) => {
									setAcountSetting({
										...accountSetting,
										role: accountSetting?.role?.filter(chp => chp !== chip)
									});
								}}
							/>
							<FormHelperText style={{ color: 'red' }}>{errors.role?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}></Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<ChipInput
								label="Job Title (Separate with Comma / Enter)"
								name="jobTitle"
								variant="outlined"
								newChipKeyCodes={[188]}
								style={{ width: '100%' }}
								error={errors.jobTitle}
								// message={errors.jobTitle?.message}
								// helperText={errors.jobTitle?.message}
								refs={register}
								allowDuplicates={false}
								value={accountSetting?.jobTitle}
								onAdd={chip => {
									let items = accountSetting?.jobTitle;
									items.push(chip);
									setAcountSetting({
										...accountSetting,
										jobTitle: items
									});
								}}
								onDelete={(chip, index) => {
									setAcountSetting({
										...accountSetting,
										jobTitle: accountSetting?.jobTitle?.filter(chp => chp !== chip)
									});
								}}
							/>
							<FormHelperText style={{ color: 'red' }}>{errors.jobTitle?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<ChipInput
								label="Employee Grade (Separate with Comma / Enter)"
								name="employeeGrade"
								variant="outlined"
								newChipKeyCodes={[188]}
								style={{ width: '100%' }}
								error={errors.employeeGrade}
								// message={errors.employeeGrade?.message}
								// helperText={errors.employeeGrade?.message}
								refs={register}
								allowDuplicates={false}
								value={accountSetting?.employeeGrade}
								onAdd={chip => {
									let items = accountSetting?.employeeGrade;
									items.push(chip);
									setAcountSetting({
										...accountSetting,
										employeeGrade: items
									});
								}}
								onDelete={(chip, index) => {
									setAcountSetting({
										...accountSetting,
										employeeGrade: accountSetting?.employeeGrade?.filter(chp => chp !== chip)
									});
								}}
							/>
							<FormHelperText style={{ color: 'red' }}>{errors.employeeGrade?.message}</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}></Grid>
				</Grid>
				<Grid container spacing={3} justify="center" align="center" className="my-10">
					<Button variant="contained" type="button" color="primary" disabled={validate()} onClick={() => onSubmit()}>
						Submit
					</Button>
				</Grid>
			</form>
		</div>
	);
}
