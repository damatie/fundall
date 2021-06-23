import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from 'app/shared/TextInput/Input';
import PhoneNumberInput from 'app/shared/TextInput/PhoneNumberInput';
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
import catchErrorMsg from 'utils/catchErrorMsg';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from "material-ui-chip-input";
import timeZone from "app/shared/timezoneList";
import currencyList from "app/shared/currencies";
import dateFormatList from "app/shared/dateformat";
import { FormHelperText } from "@material-ui/core";
import { setStepper } from './components/setStepper';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
      flexDirection: 'column',
      margin: '0rem auto',
      padding: '5rem',
      '& form': {
        width: '100%',
      }
    }
}))

const schema = yup.object().shape({
    timeZone: yup.string()
        .required(errorMsg({ name: 'Time Zone', type: 'required' })),
    dateFormat: yup.string()
        .required(errorMsg({ name: 'Date Format', type: 'required' })),
    currencies: yup.string()
        .required(errorMsg({ name: 'Currencies', type: 'required' })),
    employmentStatus: yup.array()
        .min(1, 'Must have at least one Employment Status')
        .required(errorMsg({ name: 'Employment Status', type: 'required' })),
    trainingCategories: yup.array()
        .min(1, 'Must have at least one Training Categories')
        .required(errorMsg({ name: 'Training Categories', type: 'required' })),
    modeOfEmployment: yup.array()
        .min(1, 'Must have at least one Mode Of Employment')
        .required(errorMsg({ name: 'Mode Of Employment', type: 'required' })),
    leaveTypes: yup.array()
        .min(1, 'Must have at least one Leave Status')
        .required(errorMsg({ name: 'Leave Status', type: 'required' })),
    jobTitle: yup.array()
        .min(1, 'Must have at least one Job Title')
        .required(errorMsg({ name: 'Job Title', type: 'required' })),
    employeeGrade: yup.array()
        .min(1, 'Must have at least one Employee Grade')
        .required(errorMsg({ name: 'Employee Grade', type: 'required' })),
    role: yup.array()
        .min(1, 'Must have at least one Role')
        .required(errorMsg({ name: 'Role', type: 'required' })),
    compensationSettings: yup.array()
        .min(1, 'Must have at least one Compensation Data')
        .required(errorMsg({ name: 'Compensation Data', type: 'required' })),
});


export default function AccountSettings({handleNext}) {
  const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
    mode: "all",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const timezones = timeZone();
  const dateFormats = dateFormatList();
  const currencies = currencyList();
  const [employmentStatus, setEmploymentStatus] = React.useState([]);
  const [employmentStatusErr, setEmploymentStatusErr] = React.useState("");
  const [modeOfEmployment, setModeOfEmployment] = React.useState([]);
  const [modeOfEmploymentErr, setModeOfEmploymentErr] = React.useState("");
  const [leaveTypes, setLeaveTypes] = React.useState([]);
  const [leaveTypesErr, setLeaveTypesErr] = React.useState("");
  const [trainingCategories, setTrainingCategories] = React.useState([]);
  const [trainingCategoriesErr, setTrainingCategoriesErr] = React.useState("");
  const [compensationSettings, setCompensationSettings] = React.useState([]);
  const [compensationSettingsErr, setCompensationSettingsErr] = React.useState("");
  const [role, setRole] = React.useState([]);
  const [roleErr, setRoleErr] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState([]);
  const [jobTitleErr, setJobTitleErr] = React.useState("");
  const [employeeGrade, setEmployeeGrade] = React.useState([]);
  const [employeeGradeErr, setEmployeeGradeErr] = React.useState("");
  const [timeZoneErr, setTimeZoneErr] = React.useState("");
  const [dateFormatErr, setDateFormatErr] = React.useState("");
  const [currenciesErr, setCurrenciesErr] = React.useState("");
  const classes = useStyles();


  React.useEffect(() => {
    setTimeZoneErr(errors.timeZone?.message);
    setDateFormatErr(errors.dateFormat?.message);
    setCurrenciesErr(errors.currencies?.message);
    setEmploymentStatusErr(errors.employmentStatus?.message);
    setModeOfEmploymentErr(errors.modeOfEmployment?.message);
    setLeaveTypesErr(errors.leaveTypes?.message);
    setTrainingCategoriesErr(errors.trainingCategories?.message);
    setCompensationSettingsErr(errors.compensationSettings?.message);
    setJobTitleErr(errors.jobTitle?.message);
    setEmployeeGradeErr(errors.employeeGrade?.message);
  }, [errors]);

  React.useEffect(() => {
    console.log('data: ', {...getValues()});
  }, [getValues])

  const handleTimeZoneChange = (event) => {
    register({ name: 'timeZone', type: 'custom' }, { required: true });
    setValue("timeZone", event.target.value);
    setTimeZoneErr(errors.timeZone?.message);
  };

  const handleDateFormatChange = (event) => {
    register({ name: 'dateFormat', type: 'custom' }, { required: true });
    setValue("dateFormat", event.target.value);
    setDateFormatErr(errors.dateFormat?.message);
  };

  const handleCurrenciesChange = (event) => {
    register({ name: 'currencies', type: 'custom' }, { required: true });
    setValue("currencies", event.target.value);
    setCurrenciesErr(errors.currencies?.message);
  };

  const handleAddEmploymentStatus = (chip) => {
    register({ name: 'employmentStatus', type: 'custom' }, { required: true });
    employmentStatus.push(chip)
    setValue("employmentStatus", employmentStatus);
    setEmploymentStatusErr(errors.employmentStatus?.message);
  };

  const handleDeleteEmploymentStatus = (chip, index) => {
    register({ name: 'employmentStatus', type: 'custom' }, { required: true });
    let employmentStatusData = employmentStatus;
    employmentStatusData.splice(index, 1);
    console.log("EmploymentStatus: ", employmentStatusData);
    setEmploymentStatus(employmentStatusData);
    setValue("employmentStatus", employmentStatusData);
    setEmploymentStatusErr(errors.employmentStatus?.message);
  };

  const handleAddModeOfEmployment = (chip) => {
    register({ name: 'modeOfEmployment', type: 'custom' }, { required: true });
    modeOfEmployment.push(chip)
    setValue("modeOfEmployment", modeOfEmployment);
    setModeOfEmploymentErr(errors.modeOfEmployment?.message);
  };

  const handleDeleteModeOfEmployment = (chip, index) => {
    register({ name: 'modeOfEmployment', type: 'custom' }, { required: true });
    let modeOfEmploymentData = modeOfEmployment;
    modeOfEmploymentData.splice(index, 1);
    setModeOfEmployment(modeOfEmploymentData);
    setValue("modeOfEmployment", modeOfEmploymentData);
    setModeOfEmploymentErr(errors.modeOfEmployment?.message);
  };

  const handleAddLeaveTypes = (chip) => {
    register({ name: 'leaveTypes', type: 'custom' }, { required: true });
    leaveTypes.push(chip)
    setValue("leaveTypes", leaveTypes);
    setLeaveTypesErr(errors.leaveTypes?.message);
  };

  const handleDeleteLeaveTypes = (chip, index) => {
    register({ name: 'leaveTypes', type: 'custom' }, { required: true });
    let leaveTypesData = leaveTypes;
    leaveTypesData.splice(index, 1);
    setLeaveTypes(leaveTypesData);
    setValue("leaveTypes", leaveTypesData);
    setLeaveTypesErr(errors.leaveTypes?.message);
  };

  const handleAddTrainingCategories = (chip) => {
    register({ name: 'trainingCategories', type: 'custom' }, { required: true });
    trainingCategories.push(chip)
    setValue("trainingCategories", trainingCategories);
    setTrainingCategoriesErr(errors.trainingCategories?.message);
  };

  const handleDeleteTrainingCategories = (chip, index) => {
    register({ name: 'trainingCategories', type: 'custom' }, { required: true });
    let trainingCategoriesData = trainingCategories;
    trainingCategoriesData.splice(index, 1);
    setTrainingCategories(trainingCategoriesData);
    setValue("trainingCategories", trainingCategoriesData);
    setTrainingCategoriesErr(errors.trainingCategories?.message);
  };

  const handleAddCompensationSettings = (chip) => {
    register({ name: 'compensationSettings', type: 'custom' }, { required: true });
    compensationSettings.push(chip)
    setValue("compensationSettings", compensationSettings);
    setCompensationSettingsErr(errors.compensationSettings?.message);
  };

  const handleDeleteCompensationSettings = (chip, index) => {
    register({ name: 'compensationSettings', type: 'custom' }, { required: true });
    let compensationSettingsData = compensationSettings;
    compensationSettingsData.splice(index, 1);
    setCompensationSettings(compensationSettingsData);
    setValue("compensationSettings", compensationSettingsData);
    setCompensationSettingsErr(errors.compensationSettings?.message);
  };

  const handleAddRole = (chip) => {
    register({ name: 'role', type: 'custom' }, { required: true });
    role.push(chip)
    setValue("role", role);
    setRoleErr(errors.role?.message);
  };

  const handleDeleteRole = (chip, index) => {
    register({ name: 'role', type: 'custom' }, { required: true });
    let roleData = role;
    roleData.splice(index, 1);
    setRole(roleData);
    setValue("role", roleData);
    setRoleErr(errors.role?.message);
  };

  const handleAddJobTitle = (chip) => {
    register({ name: 'jobTitle', type: 'custom' }, { required: true });
    jobTitle.push(chip)
    setValue("jobTitle", jobTitle);
    setJobTitleErr(errors.jobTitle?.message);
  };

  const handleDeleteJobTitle = (chip, index) => {
    register({ name: 'jobTitle', type: 'custom' }, { required: true });
    let jobTitleData = jobTitle;
    jobTitleData.splice(index, 1);
    setJobTitle(jobTitleData);
    setValue("jobTitle", jobTitleData);
    setJobTitleErr(errors.jobTitle?.message);
  };

  const handleAddEmployeeGrade = (chip) => {
    register({ name: 'employeeGrade', type: 'custom' }, { required: true });
    employeeGrade.push(chip)
    setValue("employeeGrade", employeeGrade);
    setEmployeeGradeErr(errors.employeeGrade?.message);
    console.log('data: ', JSON.stringify({...getValues()}));
  };

  const handleDeleteEmployeeGrade = (chip, index) => {
    register({ name: 'employeeGrade', type: 'custom' }, { required: true });
    let employeeGradeData = employeeGrade;
    employeeGradeData.splice(index, 1);
    setEmployeeGrade(employeeGradeData);
    setValue("employeeGrade", employeeGradeData);
    setEmployeeGradeErr(errors.employeeGrade?.message);
  };

  const onSubmit = async (data) => {
      try {
        const form = { ...data }
        loading('processing...');
        const { data: { message  } } = await api.post('/account_settings', form);
        swal.fire({
          text: message,
          icon: 'success'
        });
        setStepper([], 1)
        handleNext();
      } catch (e) {
        swal.fire({
          text: e?.message || 'Something went wrong',
          icon: 'error'
        })
      }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body1" color="initial" className='my-10'><strong>Account Settings</strong></Typography>
          <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Time Zone</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='timeZone'
                  error={errors.timeZone}
                  message={errors.timeZone?.message}
                  onChange={handleTimeZoneChange}
                  label="Time Zone"
                >
                  {timezones.map(item => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{timeZoneErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Date Format</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='dateFormat'
                  error={errors.dateFormat}
                  message={errors.dateFormat?.message}
                  onChange={handleDateFormatChange}
                  label="Date Format"
                >
                  {dateFormats.map(item => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{dateFormatErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Currencies</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='currencies'
                  error={errors.currencies}
                  message={errors.currencies?.message}
                  onChange={handleCurrenciesChange}
                  label="Currencies"
                >
                  {currencies.map(item => (
                  <MenuItem key={item.id} value={item.cc}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{currenciesErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <ChipInput
                label='Employment Status (Separate with Comma / Enter)'
                name='employmentStatus'
                variant= 'outlined'
                newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.employmentStatus}
                message={errors.employmentStatus?.message}
                helperText={errors.employmentStatus?.message}
                // refs={register}
                allowDuplicates={false}
                value={employmentStatus}
                onAdd={(chip) => handleAddEmploymentStatus(chip)}
                onDelete={(chip, index) => handleDeleteEmploymentStatus(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{employmentStatusErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <ChipInput
                label='Mode Of Employment (Separate with Comma / Enter)'
                name='modeOfEmployment'
                variant= 'outlined'
                newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.modeOfEmployment}
                message={errors.modeOfEmployment?.message}
                helperText={errors.modeOfEmployment?.message}
                // refs={register}
                allowDuplicates={false}
                value={modeOfEmployment}
                onAdd={(chip) => handleAddModeOfEmployment(chip)}
                onDelete={(chip, index) => handleDeleteModeOfEmployment(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{modeOfEmploymentErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <ChipInput
                label='Leave Status (Separate with Comma / Enter)'
                name='leaveTypes'
                variant= 'outlined'
                newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.leaveTypes}
                message={errors.leaveTypes?.message}
                helperText={errors.leaveTypes?.message}
                // refs={register}
                allowDuplicates={false}
                value={leaveTypes}
                onAdd={(chip) => handleAddLeaveTypes(chip)}
                onDelete={(chip, index) => handleDeleteLeaveTypes(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{leaveTypesErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <ChipInput
                label='Training Categories (Separate with Comma / Enter)'
                name='trainingCategories'
                variant= 'outlined'
                newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.trainingCategories}
                message={errors.trainingCategories?.message}
                helperText={errors.trainingCategories?.message}
                // refs={register}
                allowDuplicates={false}
                value={trainingCategories}
                onAdd={(chip) => handleAddTrainingCategories(chip)}
                onDelete={(chip, index) => handleDeleteTrainingCategories(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{trainingCategoriesErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <ChipInput
                label='Role (Separate with Comma / Enter)'
                name='role'
                variant= 'outlined'
                newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.role}
                message={errors.role?.message}
                helperText={errors.role?.message}
                // refs={register}
                allowDuplicates={false}
                value={role}
                onAdd={(chip) => handleAddRole(chip)}
                onDelete={(chip, index) => handleDeleteRole(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{roleErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <ChipInput
                label='Compensation Data (Separate with Comma / Enter)'
                name='compensationSettings'
                variant= 'outlined'
                newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.compensationSettings}
                message={errors.compensationSettings?.message}
                helperText={errors.compensationSettings?.message}
                // refs={register}
                allowDuplicates={false}
                value={compensationSettings}
                onAdd={(chip) => handleAddCompensationSettings(chip)}
                onDelete={(chip, index) => handleDeleteCompensationSettings(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{compensationSettingsErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <ChipInput
                label='Job Title (Separate with Comma / Enter)'
                name='jobTitle'
                variant= 'outlined'
                newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.jobTitle}
                message={errors.jobTitle?.message}
                helperText={errors.jobTitle?.message}
                // refs={register}
                allowDuplicates={false}
                value={jobTitle}
                onAdd={(chip) => handleAddJobTitle(chip)}
                onDelete={(chip, index) => handleDeleteJobTitle(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{jobTitleErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <ChipInput
                label='Employee Grade (Separate with Comma / Enter)'
                name='employeeGrade'
                variant= 'outlined'
                newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.employeeGrade}
                message={errors.employeeGrade?.message}
                helperText={errors.employeeGrade?.message}
                // refs={register}
                allowDuplicates={false}
                value={employeeGrade}
                onAdd={(chip) => handleAddEmployeeGrade(chip)}
                onDelete={(chip, index) => handleDeleteEmployeeGrade(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{employeeGradeErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
            </Grid>  
          </Grid>
          <Grid container spacing={3} justify='center' align='center' className='my-10'>
              <Button variant="contained" type='submit' color="primary">
                  Submit 
              </Button>
              <Button variant="contained" color="secondary" className='mx-5' style={{ marginLeft: '10px', marginRight: '10px' }} onClick={handleNext}>
                temp NEXT
              </Button>
          </Grid>
      </form>
    </div>
  );
}