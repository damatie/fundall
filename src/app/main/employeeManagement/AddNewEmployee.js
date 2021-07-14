import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from 'app/shared/TextInput/Input';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { DatePicker } from "@material-ui/pickers";
import *  as Actions from 'app/main/employeeManagement/store/actions';
import withReducer from "app/store/withReducer";
import employeesReducer from "./store/reducers/employees.reducer";
import { indexOf } from "lodash";
import loading from "utils/loading";

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
  firstName: yup.string(errorMsg({ name: 'First Name', type: 'string' }))
      .required(errorMsg({ name: 'First Name', type: 'required' }))
      .min(3, errorMsg({ name: 'First', type: 'min', number: 3 }))
      .max(60, errorMsg({ name: 'First', type: 'max', number: 60 }))
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  lastName: yup.string(errorMsg({ name: 'Last Name', type: 'string' }))
      .required(errorMsg({ name: 'Last Name', type: 'required' }))
      .min(3, errorMsg({ name: 'Last Name', type: 'min', number: 3 }))
      .max(60, errorMsg({ name: 'Last Name', type: 'max', number: 60 }))
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  middleName: yup.string(errorMsg({ name: 'Middle Name', type: 'string' }))
      // .required(errorMsg({ name: 'Middle Name', type: 'required' }))
      .min(3, errorMsg({ name: 'Middle Name', type: 'min', number: 3 }))
      .max(60, errorMsg({ name: 'Middle Name', type: 'max', number: 60 }))
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  employeeId: yup.string(errorMsg({ name: 'Employee ID', type: 'string' }))
      .required(errorMsg({ name: 'Employee ID', type: 'required' })),
  // userName: yup.string(errorMsg({ name: 'User Name', type: 'string' }))
  //     .required(errorMsg({ name: 'User Name', type: 'required' }))
  //     .min(3, errorMsg({ name: 'User Name', type: 'min', number: 3 })).matches(/^[ A-Za-z_@./#&+-]*$/, "Only alphabets and Special Case Characters are allowed for this field " ),
  email: yup.string()
      .matches(/^[A-Za-z\d@$!%*#?&]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/, "Enter a valid Email Address")
      .required(errorMsg({ name: 'Email Address', type: 'required' }))
      .email(),
  entityId: yup.number()
      .required(errorMsg({ name: 'Entity', type: 'required' })),
  departmentId: yup.number()
      .required(errorMsg({ name: 'Department', type: 'required' })),
  roleId: yup.number()
      .required(errorMsg({ name: 'Role', type: 'required' })),
  jobTitleId: yup.number()
      .required(errorMsg({ name: 'Job Title', type: 'required' })),
  employeeGradeId: yup.number()
      .required(errorMsg({ name: 'Employee Grade', type: 'required' })),
  employeeGradeLevelId: yup.number()
      .required(errorMsg({ name: 'Employee Grade Level', type: 'required' })),
  employmentStatus: yup.string()
      .required(errorMsg({ name: 'Employment Status', type: 'required' })),
  modeOfEmployment: yup.string()
      .required(errorMsg({ name: 'Mode Of Employment', type: 'required' })),
  startDate: yup.string()
      .required(errorMsg({ name: 'Employee Start Date', type: 'required' })),
});

function AddNewEmployee() {
  
  const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
    // mode: "onBlur",
    mode: "all",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });


  const dispatch = useDispatch();

  const { entities, roles, jobTitles, accountSettings } = useSelector(state => state.employeeMgt);
  // // console.log('roles: ', roles);
  const employmentStatusList = accountSettings?.employmentStatus || [];
  const modeOfEmploymentList = accountSettings?.modeOfEmployment || [];
  const [startDate, setStartDate] = React.useState(new Date());
  const [checked, setChecked] = React.useState(true);
  const [entityId, setEntityId] = React.useState(null);
  const [entityErr, setEntityErr] = React.useState("");
  const [selectDept, setSelectDept] = React.useState(true);
  const [selectGrades, setSelectGrades] = React.useState(true);
  const [selectGradeLevels, setSelectGradeLevels] = React.useState(true);
  const [grades, setGrades] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [employeeGradeLevels, setEmployeeGradeLevels] = React.useState([]);
  const [departmentId, setDepartmentId] = React.useState(null);
  const [departmentErr, setDepartmentErr] = React.useState("");
  const [roleId, setRoleId] = React.useState(null);
  const [roleErr, setRoleErr] = React.useState(null);
  const [employmentStatus, setEmploymentStatus] = React.useState('');
  const [employmentStatusErr, setEmploymentStatusErr] = React.useState('');
  const [modeOfEmployment, setModeOfEmployment] = React.useState('');
  const [modeOfEmploymentErr, setModeOfEmploymentErr] = React.useState('');
  const [jobTitleId, setJobTitleId] = React.useState('');
  const [jobTitleErr, setJobTitleErr] = React.useState('');
  const [employeeId, setEmployeeId] = React.useState('');
  const [employeeGradeId, setEmployeeGradeId] = React.useState(undefined);
  const [employeeGradeErr, setEmployeeGradeErr] = React.useState('');
  const [employeeGradeLevelId, setEmployeeGradeLevelId] = React.useState(undefined);
  const [employeeGradeLevelErr, setEmployeeGradeLevelErr] = React.useState('');
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(Actions.getEntities());
    dispatch(Actions.getRoles());
    dispatch(Actions.getGrades());
    dispatch(Actions.getJobTitle());
    dispatch(Actions.getAccountSettings());
  }, []);

  React.useEffect(() => {
    register({ name: 'startDate', type: 'custom' }, { required: true });
    setValue("startDate", JSON.stringify(startDate));
  }, [startDate]);

  React.useEffect(() => {
    setEntityErr(errors.entityId?.message);
    setDepartmentErr(errors.departmentId?.message);
    setRoleErr(errors.roleId?.message);
    setEmploymentStatusErr(errors.employmentStatus?.message);
    setModeOfEmploymentErr(errors.modeOfEmployment?.message);
    setJobTitleErr(errors.jobTitleId?.message);
    setEmployeeGradeErr(errors.employeeGradeId?.message);
    setEmployeeGradeLevelErr(errors.employeeGradeLevelId?.message);    
  }, [errors]);
  
  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
  };
  
  const handleEntityChange = async (event) => {
    setEntityId(event.target.value.id);
    register({ name: 'entityId', type: 'custom' }, { required: true });
    setValue("entityId", event.target.value.id);
    setEntityErr(errors.entityId?.message);
    setDepartments(event.target.value.department);
    setSelectDept(false);
    const { data: { success, data  } } = await api.get(`/entity/${event.target.value.id}`);
    if (success && data) {
      if(data.employeeGrades.length > 0) {
        // console.log('Grades: ', data.employeeGrades);
        setGrades(data.employeeGrades);
        setSelectGrades(false);
      }
    }
  };

  const handleDepartmentChange = (event) => {
    register({ name: 'departmentId', type: 'custom' }, { required: true });
    setValue("departmentId", event.target.value.id);
    setDepartmentId(event.target.value.id);
    setDepartmentErr(errors.departmentId?.message);
  };

    const handleRoleChange = (event) => {
    register({ name: 'roleId', type: 'custom' }, { required: true });
    setValue("roleId", event.target.value.id);
    setRoleId(event.target.value.id);
    setRoleErr(errors.roleId?.message);
  };
  
  const handleEmploymentStatusChange = (event) => {
    register({ name: 'employmentStatus', type: 'custom' }, { required: true });
    setValue("employmentStatus", event.target.value);
    setEmploymentStatus(event.target.value);
    setEmploymentStatusErr(errors.employmentStatus?.message);
  };
  
  const handleModeOfEmploymentChange = (event) => {
    register({ name: 'modeOfEmployment', type: 'custom' }, { required: true });
    setValue("modeOfEmployment", event.target.value);
    setModeOfEmployment(event.target.value);
    setModeOfEmploymentErr(errors.modeOfEmployment?.message);
  };
  
  const handleJobTitleChange = (event) => {
    register({ name: 'jobTitleId', type: 'custom' }, { required: true });
    setValue("jobTitleId", event.target.value.id);
    setJobTitleId(event.target.value.id);
    setJobTitleErr(errors.jobTitleId?.message);
  };
  
  const handleEmployeeChange = (event) => {
    setEmployeeId(event.target.value);
  };
  
  const handleEmployeeGradeChange = (event) => {
    register({ name: 'employeeGradeId', type: 'custom' }, { required: true });
    setEmployeeGradeId(event.target.value.id);
    setValue("employeeGradeId", event.target.value.id);
    if(event.target.value.employeeGradeLevels.length > 0) { 
      setEmployeeGradeLevels(event.target.value.employeeGradeLevels);
      setSelectGradeLevels(false);
    } else {
      register({ name: 'employeeGradeLevelId', type: 'custom' }, { required: true });
      setValue("employeeGradeLevelId", 0);
      setEmployeeGradeLevelErr(errors.employeeGradeLevelId?.message);
    }
    setEmployeeGradeErr(errors.employeeGradeId?.message);
  };
  
  const handleEmployeeGradeLevelChange = (event) => {
    register({ name: 'employeeGradeLevelId', type: 'custom' }, { required: true });
    setEmployeeGradeLevelId(event.target.value.id);
    setValue("employeeGradeLevelId", event.target.value.id);
    setEmployeeGradeLevelErr(errors.employeeGradeLevelId?.message);
  };

  const onSubmit = async (data) => {
    try {
      const form = { ...data, srgIdNumber: employeeId, entityId, departmentId, roleId, employmentStatus, modeOfEmployment, jobTitleId, employeeGradeId, employeeGradeLevelId };
      form.employeeId = undefined;
      form.employeeStatus = form.employmentStatus;
      form.employmentStatus = undefined;
      const dateValue = form.startDate.split(`\"`);
      form.startDate = dateValue[1].substring(0, 10);
      // console.log('Form: ', JSON.stringify(form));
      loading('Creating Employee Account...');
      const { data: { message  } } = await api.post('/auth/employee/add-employee', form);
      swal.fire({
        text: message,
        icon: 'success'
      });
      window.location.assign('/employee_management');
    } catch (e) {
      swal.fire({
        text: e?.message || 'Something went wrong',
        icon: 'error'
      })
    }
  };

  return (
    <Card className={classes.root}>
      <Typography variant="h6" color="initial" justify='center' align='center' className='my-20'><strong>Create Employee Account</strong></Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1" color="initial" className='my-10'><strong>Employee Login Information</strong></Typography>
          <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                required
                label='First Name'
                name='firstName'
                error={errors.firstName}
                message={errors.firstName?.message}
                helperText={errors.firstName?.message}
                refs={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                required
                label='Middle Name'
                name='middleName'
                error={errors.middleName?.message}
                message={errors.middleName?.message}
                helperText={errors.middleName?.message}
                refs={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                required
                label='Last Name'
                name='lastName'
                error={errors.lastName}
                message={errors.lastName?.message}
                helperText={errors.lastName?.message}
                refs={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                required
                label='Official Email Address'
                name='email'
                error={errors.email}
                message={errors.email?.message}
                helperText={errors.email?.message}
                refs={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                required
                label='Employee ID'
                name='employeeId'
                onChange={handleEmployeeChange}
                error={errors.employeeId}
                message={errors.employeeId?.message}
                helperText={errors.employeeId?.message}
                refs={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormControlLabel control={<Checkbox
                checked={checked}
                onChange={handleCheckedChange}
                name="checked"
                color="primary"
                style={{ marginLeft: '10px' }}
              />}
              label="I want to recieve newsletters and updates" />
            </Grid>
          </Grid>

          <Typography variant="body1" color="initial" className='my-10'><strong>Company Information</strong></Typography>
          <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Entity</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='entityId'
                  error={errors.entityId}
                  message={errors.entityId?.message}
                  onChange={handleEntityChange}
                  label="Entity"
                >
                  {entities.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.entityName}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{entityErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='departmentId'
                  error={errors.departmentId}
                  message={errors.departmentId?.message}
                  disabled={selectDept}
                  variant={selectDept ? 'filled' : 'outlined'}
                  onChange={handleDepartmentChange}
                  label="Department"
                >
                  {departments.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.departmentName}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{departmentErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='role'
                  error={errors.roleId}
                  message={errors.roleId?.message}
                  onChange={handleRoleChange}
                  label="Role"
                >
                  {roles.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{roleErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Job Title</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='jobTitleId'
                  error={errors.jobTitleId}
                  message={errors.jobTitleId?.message}
                  onChange={handleJobTitleChange}
                  label="Job Title"
                >
                  {jobTitles.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{jobTitleErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Employee Grade</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='employeeGradeId'
                  error={errors.employeeGradeId}
                  message={errors.employeeGradeId?.message}
                  disabled={selectGrades}
                  variant={selectGrades ? 'filled' : 'outlined'}
                  onChange={handleEmployeeGradeChange}
                  label="Employee Grade"
                >
                  {grades.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.gradeName}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{employeeGradeErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Employee Grade Level</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='employeeGradeLevelId'
                  error={errors.employeeGradeLevelId}
                  message={errors.employeeGradeLevelId?.message}
                  disabled={selectGradeLevels}
                  variant={selectGradeLevels ? 'filled' : 'outlined'}
                  onChange={handleEmployeeGradeLevelChange}
                  label="Employee Grade Level"
                >
                  {employeeGradeLevels.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.level}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{employeeGradeLevelErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <DatePicker
                  inputVariant="outlined"
                  name='startDate'
                  maxDate={new Date()}
                  error={errors.startDate}
                  message={errors.startDate?.message}
                  label='Employee Start Date'
                  className="w-full"
                  value={startDate}
                  onChange={(newValue) => {
                    // console.log('errors: ', errors);
                    setStartDate(newValue);
                    register({ name: 'startDate', type: 'custom' }, { required: true });
                    setValue("startDate", JSON.stringify(newValue));
                  }}
                  format="MM/DD/yyyy"
                  helperText={errors.startDate?.message}
                />
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Employment Status</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='employmentStatus'
                  error={errors.employmentStatus}
                  message={errors.employmentStatus?.message}
                  onChange={handleEmploymentStatusChange}
                  label="Employment Status"
                >
                  {employmentStatusList.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{employmentStatusErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Mode Of Employment</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='modeOfEmployment'
                  error={errors.modeOfEmployment}
                  message={errors.modeOfEmployment?.message}
                  onChange={handleModeOfEmploymentChange}
                  label="Mode Of Employment"
                >
                  {modeOfEmploymentList.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{modeOfEmploymentErr}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3} justify='center' align='center'>
            <Button variant="contained" type='submit' color="primary">
                Submit 
            </Button>
          </Grid>
      </form>
    </Card>
  );
}

withReducer('employeeMgt', employeesReducer)(AddNewEmployee);
export default AddNewEmployee;