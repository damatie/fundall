import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from 'app/shared/TextInput/Input';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import PhoneNumberInput from 'app/shared/TextInput/PhoneNumberInput';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import { makeStyles } from '@material-ui/core/styles';
import catchErrorMsg from 'utils/catchErrorMsg';
import { useDispatch } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';

// const schema = yup.object().shape({
//   firstName: yup.string().required(),
//   age: yup.number().positive().integer().required(),
// });

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
    password: yup.string()
      .min(6)
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
      .required(errorMsg({ name: 'Password', type: 'required' })),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(errorMsg({ name: 'Confirm Password', type: 'required' })),
    companyName: yup.string(errorMsg({ name: 'Company name', type: 'string' }))
        .required(errorMsg({ name: 'Company name', type: 'required' })),
    hasEntities: yup.bool(errorMsg({ name: 'Company Has Entities?', type: 'boolean' }))
        .required(errorMsg({ name: 'Company Has Entities?', type: 'required' })),
    contactEmail: yup.string()
        .required(errorMsg({ name: 'Company Contact Email', type: 'required' }))
        .matches(/^[A-Za-z\d@$!%*#?&]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/, "Enter a valid Email Address")
        .email(),
  });

  const EmployeesRange = [
    {
      id: 0,
      name: '1-50',
      min: 1,
      max: 50 
    },
    {
      id: 1,
      name: '51-100',
      min: 51,
      max: 100 
    },
    {
      id: 2,
      name: '101-150',
      min: 101,
      max: 150 
    },
    {
      id: 3,
      name: '151-200',
      min: 151,
      max: 200 
    },
    {
      id: 4,
      name: 'Above 200',
      min: 201,
      max: undefined 
    },
  ]

const organisationList = [
    {number: 0, name: 'Banking and Finance'},
    {number: 1, name: 'FCMG'},
    {number: 2, name: 'Business Services'},
    {number: 3, name: 'Consulting and Management'},
    {number: 4, name: 'Information technology'},
    {number: 5, name: 'Engineering and Manufacturing'},
    {number: 6, name: 'Health care'},
    {number: 7, name: 'Retail'},
    {number: 8, name: 'Accounting'},
    {number: 9, name: 'Law'},
    {number: 10, name: 'Property and Construction'},
    {number: 11, name: 'Media and Internet'},
    {number: 12, name: 'Charity and Voluntary Work'},
    {number: 13, name: 'Law enforcement and Security'},
    {number: 14, name: 'Marketing'},
    {number: 15, name: 'Advertising and PR'},
    {number: 16, name: 'Public Services and Administration'},
    {number: 17, name: 'Transport and Logistics'},
    {number: 18, name: 'Education'},
    {number: 19, name: 'Others'}
];

export default function Register() {
  const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
    mode: "onBlur",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(true);
  // const [hasEntities, setHasEntities] = React.useState(undefined);
  const [hasEntity, setHasEntity] = React.useState(undefined);
  let hasEntities = undefined;
  // const [isTrue, setIsTrue] = React.useState(undefined);
  let isTrue = undefined;
  // const [isFalse, setIsFalse] = React.useState(undefined);
  let isFalse = undefined;
  const [hasEntitiesErr, setHasEntitiesErr] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState(234);
  const [phoneNumber, setPhoneNumber] = React.useState(234);
  const [industry, setIndustry] = React.useState('Banking and Finance');
  const [minNoOfEmployees, setMinNoOfEmployees] = React.useState(1);
  const [maxNoOfEmployees, setMaxNoOfEmployees] = React.useState(50);
  const classes = useStyles();

  React.useEffect(() => {
    setHasEntitiesErr(errors.hasEntities?.message);
  }, [errors]);
  
  // React.useEffect(() => {
  //   // console.log('something has changed')
  // }, [isTrue, isFalse]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleContactChange = (event) => {
    setContactNumber(event);
  };
    
  const handlePhoneChange = (event) => {
    setPhoneNumber(event);
  };

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };

  const handleEmployeeRangeChange = (event) => {
    setMinNoOfEmployees(event.target.value.min);
    setMaxNoOfEmployees(event.target.value.max);
  };

  const setToTrue = () => {
    let hasEntT = hasEntities 
    if (hasEntities === false) {
      hasEntT = true;
    }
    if (hasEntities === undefined) {
      hasEntT = true;
    }
    if (hasEntities === true) {
      hasEntT = undefined;
    }
    hasEntities = hasEntT;
    setHasEntity(hasEntities);
    // console.log('set to True is Clicked: hasEntities=', hasEntities);
    register({ name: 'hasEntities', type: 'boolean' }, { required: true });
    setValue("hasEntities", hasEntities);
    setHasEntitiesErr(errors.hasEntities?.message);
  };

  const setToFalse = () => {
    let hasEnt = hasEntities 
    if (hasEntities === false) {
      hasEnt = undefined;
    }
    if (hasEntities === undefined) {
      hasEnt = false;
    }
    if (hasEntities === true) {
      hasEnt = false;
    }
    hasEntities = hasEnt;
    setHasEntity(hasEntities);
    // console.log('set to False is Clicked: hasEntities=', hasEntities);
    register({ name: 'hasEntities', type: 'boolean' }, { required: true });
    setValue("hasEntities", hasEntities);
    setHasEntitiesErr(errors.hasEntities?.message);
  };

  const onSubmit = async (data) => {
      try {
        const form = { ...data, contactNumber, phoneNumber, industry, minNoOfEmployees, maxNoOfEmployees }
        // console.log('Create Account form: ', form);
        loading('Creating Account...');
        const { data: { message  } } = await api.post('/companies', form);
        swal.fire({
          text: message,
          icon: 'success'
        });
        localStorage.clear();
        window.location.assign('/auth/login');
      } catch (e) {
        swal.fire({
          text: e?.message || 'Something went wrong',
          icon: 'error'
        })
      }
  };

  return (
    <Card className={classes.root}>
      <Typography variant="h6" color="initial" justify='center' align='center' className='my-20'><strong>Create Account</strong></Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body1" color="initial" className='my-10'><strong>My Login Information</strong></Typography>
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
                  error={errors.middleName}
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
                  label='User Name'
                  name='userName'
                  error={errors.userName}
                  message={errors.userName?.message}
                  helperText={errors.userName?.message}
                  refs={register}
              />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                  required
                  label='Email Address'
                  name='email'
                  error={errors.email}
                  message={errors.email?.message}
                  helperText={errors.email?.message}
                  refs={register}
              />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <PhoneNumberInput
                  placeholder='Contact Number'
                  name='phoneNumber'
                  onChange={handlePhoneChange}
                  error={errors.phoneNumber}
                  refs={register}
                  type='number'
                  message={errors.phoneNumber?.message}
                  helperText={errors.phoneNumber?.message}
                  country={'ng'}
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                  required
                  label='Password'
                  name='password'
                  type='password'
                  error={errors.password}
                  message={errors.password?.message}
                  helperText={errors.password?.message}
                  refs={register}
              />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                  required
                  label='Confirm Password'
                  name='confirmPassword'
                  type='password'
                  error={errors.confirmPassword}
                  message={errors.confirmPassword?.message}
                  helperText={errors.confirmPassword?.message}
                  refs={register}
              />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormControlLabel control={<Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                  style={{ marginLeft: '10px' }}
                  />}
                  label="I want to recieve newsletters and updates" />
              </Grid>
              </Grid>

              <Typography variant="body1" color="initial" className='my-10'><strong>Company Information</strong></Typography>
              <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                  <Input
                  required
                  label='Company Name'
                  name='companyName'
                  error={errors.companyName}
                  message={errors.companyName?.message}
                  helperText={errors.companyName?.message}
                  refs={register}
                  />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%' }} className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Industry</InputLabel>
                  <Select
                    required
                    justify='left'
                    align='left'
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    defaultValue={industry}
                    message={errors.industry?.message}
                    helperText={errors.industry?.message}
                    // refs={register}
                    onChange={handleIndustryChange}
                    label="Industry"
                  >
                    {organisationList.map(item => (
                    <MenuItem key={item.number} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Number of Employees</InputLabel>
                <Select
                  required
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  defaultValue={EmployeesRange[0]}
                  message={errors.minNoOfEmployees?.message}
                  helperText={errors.minNoOfEmployees?.message}
                  // refs={register}
                  onChange={handleEmployeeRangeChange}
                  label="Number of Employees"
                >
                  {EmployeesRange.map(item => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                  <PhoneNumberInput
                    placeholder='Company Contact Number'
                    name='contactNumber'
                    onChange={handleContactChange}
                    error={errors.contactNumber}
                    refs={register}
                    type='number'
                    message={errors.contactNumber?.message}
                    helperText={errors.contactNumber?.message}
                    country={'ng'}
                  />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                  <Input
                  required
                  label='Company Contact Email'
                  name='contactEmail'
                  error={errors.contactEmail}
                  message={errors.contactEmail?.message}
                  helperText={errors.contactEmail?.message}
                  refs={register}
                  />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} justify='space-between' align='center' direction='row' className="my-20" style={{ backgroundColor: "#fff" }}>
                <Box
                  boxShadow={3}
                  bgcolor="background.paper"
                  p={2}
                >
                  <span justify='space-between' align='center' direction='row' className='flex-row'>
                    <span variant="body2" color="initial" className='mx-20'><strong>My Company has Entities</strong></span>
                    {(hasEntity === undefined || hasEntity === false) && <Button variant="contained" onClick={setToTrue} className='mx-20'>
                      YES 
                    </Button>}
                    {hasEntity === true && <Button variant="contained" onClick={setToTrue} color="secondary" className='mx-20'>
                      YES 
                    </Button>} 
                    {(hasEntity === undefined || hasEntity === true) && <Button variant="contained" onClick={setToFalse} className='mx-20'>
                      NO 
                    </Button>}
                    {hasEntity === false && <Button variant="contained" onClick={setToFalse} color="secondary" className='mx-20'>
                      NO 
                    </Button>}  
                  </span>
                </Box>
                <FormHelperText style={{ color: 'red', textAlign: 'center'}}>{hasEntitiesErr}</FormHelperText>
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