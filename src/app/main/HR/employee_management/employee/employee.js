import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from 'app/shared/TextInput/Input';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import entityReducer from 'app/main/HR/business_unit/store/reducers';
import departmentReducer from 'app/main/HR/business_unit/department/store/reducers';
import rolesReducer from 'app/main/HR/roles/store/reducers';
import * as entityActions from 'app/main/HR/business_unit/store/actions';
import * as departmentActions from 'app/main/HR/business_unit/department/store/actions';
import * as rolesActions from 'app/main/HR/roles/store/actions';
import { DatePicker } from "@material-ui/pickers";


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
      .required(errorMsg({ name: 'Middle Name', type: 'required' }))
      .min(3, errorMsg({ name: 'Middle Name', type: 'min', number: 3 }))
      .max(60, errorMsg({ name: 'Middle Name', type: 'max', number: 60 }))
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  userName: yup.string(errorMsg({ name: 'User Name', type: 'string' }))
      .required(errorMsg({ name: 'User Name', type: 'required' }))
      .min(3, errorMsg({ name: 'User Name', type: 'min', number: 3 })).matches(/^[ A-Za-z_@./#&+-]*$/, "Only alphabets and Special Case Characters are allowed for this field " ),
  email: yup.string()
      .matches(/^[A-Za-z\d@$!%*#?&]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/, "Enter a valid Email Address")
      .required(errorMsg({ name: 'Email Address', type: 'required' }))
      .email(),
});

function Employee() {
  
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });


  const dispatch = useDispatch();
  const entities = useSelector(({ entity }) => entity.entities.data);
  //   const employee = useSelector(({ employees }) => employees.employee);
  const jobTitle = useSelector(({ jobTitles }) => jobTitles);
  console.log('jobTitle: ', jobTitle)
  const jobTitles = [];
  const role = useSelector(({ roles }) => roles);
  console.log('role: ', role)
  const roles = [];
  const employmentStatusList = [];
  const modeOfEmploymentList = [];
  const employeeGrades = [];
  const employeeGradeLevels = [];
  const [startDate, setStartDate] = React.useState(null);
  const [checked, setChecked] = React.useState(true);
  const [entityId, setEntityId] = React.useState(null);
  const [departments, setDepartments] = React.useState([]);
  const [departmentId, setDepartmentId] = React.useState(null);
  const [roleId, setRoleId] = React.useState(null);
  const [employmentStatus, setEmploymentStatus] = React.useState('');
  const [modeOfEmployment, setModeOfEmployment] = React.useState('');
  const [jobTitleId, setJobTitleId] = React.useState('');
  const [employeeId, setEmployeeId] = React.useState('');
  const [employeeGradeId, setEmployeeGradeId] = React.useState('');
  const [employeeGradeLevelId, setEmployeeGradeLevelId] = React.useState('');
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(entityActions.getEntities());
    dispatch(rolesActions.getRoles());
    console.log('entities: ', entities)
  }, []);
  
  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
  };
  
  const handleEntityChange = (event) => {
    // getDepartments(e.target.value.id);
    setEntityId(event.target.value.id);
    setDepartments(event.target.value.department)
  };

  const handleDepartmentChange = (event) => {
    setDepartmentId(event.target.value.id);
  };

  const handleRoleChange = (event) => {
    setRoleId(event.target.value.id);
  };

  const handleEmploymentStatusChange = (event) => {
    setEmploymentStatus(event.target.value);
  };

  const handleModeOfEmploymentChange = (event) => {
    setModeOfEmployment(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitleId(event.target.value.id);
  };
  
  const handleEmployeeChange = (event) => {
    // get EmployeeGradeLevels
    setEmployeeId(event.target.value);
  };

  const handleEmployeeGradeChange = (event) => {
    setEmployeeGradeId(event.target.value.id);
  };

  const handleEmployeeGradeLevelChange = (event) => {
    setEmployeeGradeLevelId(event.target.value.id);
  };

  const onSubmit = async (data) => {
    try {
      const form = { ...data, srgIdNumber: employeeId, entityId, departmentId, roleId, employmentStatus, modeOfEmployment, jobTitleId, employeeGradeId, employeeGradeLevelId };
      console.log('Form: ', form)
      loading('Creating Employee Account...');
      const { data: { message  } } = await api.post('/auth/employee/add-employee', form);
      swal.fire({
        text: message,
        icon: 'success'
      });
      localStorage.clear();
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
                label='Middle Name'
                name='middleName'
                error={errors.middleName}
                message={errors.middleName?.message}
                helperText={errors.middleName?.message}
                inputRef={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                label='Last Name'
                name='lastName'
                error={errors.lastName}
                message={errors.lastName?.message}
                helperText={errors.lastName?.message}
                inputRef={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                label='Official Email Address'
                name='email'
                error={errors.email}
                message={errors.email?.message}
                helperText={errors.email?.message}
                inputRef={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                label='Employee ID'
                name='employeeId'
                onChange={handleEmployeeChange}
                error={errors.employeeId}
                helperText={errors.employeeId?.message}
                inputRef={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} display="flex" direction="row">
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
                  defaultValue={entities[0]}
                  onChange={handleEntityChange}
                  label="Entity"
                >
                  {entities.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.entityName}
                  </MenuItem>))}
                </Select>
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
                  defaultValue={departments[0]}
                  onChange={handleDepartmentChange}
                  label="Department"
                >
                  {departments.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.departmentName}
                  </MenuItem>))}
                </Select>
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
                  defaultValue={roles[0]}
                  onChange={handleRoleChange}
                  label="Role"
                >
                  {roles.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>))}
                </Select>
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
                  defaultValue={jobTitles[0]}
                  onChange={handleJobTitleChange}
                  label="Job Title"
                >
                  {jobTitles.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>))}
                </Select>
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
                  defaultValue={employeeGrades[0]}
                  onChange={handleEmployeeGradeChange}
                  label="Employee Grade"
                >
                  {employeeGrades.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>))}
                </Select>
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
                  defaultValue={employeeGradeLevels[0]}
                  onChange={handleEmployeeGradeLevelChange}
                  label="Employee Grade Level"
                >
                  {employeeGradeLevels.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <DatePicker
                  inputVariant="outlined"
                  inputRef={register}
                  label='Employee Start Date'
                  className="w-full"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  format="MM/DD/yyyy"
                  error={errors.startDate}
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
                  defaultValue={employmentStatusList[0]}
                  onChange={handleEmploymentStatusChange}
                  label="Employment Status"
                >
                  {employmentStatusList.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>))}
                </Select>
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
                  defaultValue={modeOfEmploymentList[0]}
                  onChange={handleModeOfEmploymentChange}
                  label="Mode Of Employment"
                >
                  {modeOfEmploymentList.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>))}
                </Select>
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

withReducer('roles', rolesReducer)(Employee);
withReducer('entity', entityReducer)(Employee);
withReducer('department', departmentReducer)(Employee);
export default withReducer('employees', reducer)(Employee);