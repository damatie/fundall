import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { DatePicker } from "@material-ui/pickers";
import Input from 'app/shared/TextInput/Input';
import PhoneNumberInput from 'app/shared/TextInput/PhoneNumberInput';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Card from '@material-ui/core/Card';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import { makeStyles } from '@material-ui/core/styles';
// import catchErrorMsg from 'utils/catchErrorMsg';
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
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EntityModal from "./components/entityModal";
import EmployeeGradeModal from "./components/employeeGrade";
import EmployeeGradeLevelModal from "./components/employeeGradeLevel";

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
    companyType: yup.string()
        .required(errorMsg({ name: 'Company Type', type: 'required' })),
    companyStartDate: yup.string()
        .required(errorMsg({ name: 'Company Start Date', type: 'required' })),
    noOfBranches: yup.string()
        .required(errorMsg({ name: 'Number Of Branches', type: 'required' })),
    companyEmail: yup.string()
        .matches(/^[A-Za-z\d@$!%*#?&]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/, "Enter a valid Email Address")
        .required(errorMsg({ name: 'Email Address', type: 'required' }))
        .email(),
    country: yup.string()
        .required(errorMsg({ name: 'Country', type: 'required' })),
    state: yup.string()
        .required(errorMsg({ name: 'State', type: 'required' })),
    city: yup.string()
        .required(errorMsg({ name: 'City', type: 'required' })),
    companyVision: yup.string(errorMsg({ name: 'Company Vision', type: 'string' }))
        // .min(3, errorMsg({ name: 'Company Vision', type: 'min', number: 3 }))
        // .max(60, errorMsg({ name: 'Company Vision', type: 'max', number: 60 }))
        ,
    companyMission: yup.string(errorMsg({ name: 'Company Mission', type: 'string' }))
        // .min(3, errorMsg({ name: 'Company Mision', type: 'min', number: 3 }))
        // .max(60, errorMsg({ name: 'Company Mision', type: 'max', number: 60 }))
        ,
    companyWebsite: yup.string(errorMsg({ name: 'Company Website', type: 'string' }))
        // .min(3, errorMsg({ name: 'Company Website', type: 'min', number: 3 }))
        // .max(60, errorMsg({ name: 'Company Website', type: 'max', number: 60 }))
        ,
    hqAddress: yup.string(errorMsg({ name: 'HQ Address', type: 'string' }))
        // .min(3, errorMsg({ name: 'Middle Name', type: 'min', number: 3 }))
        // .max(60, errorMsg({ name: 'Middle Name', type: 'max', number: 60 }))
        ,
    branchAddresses: yup.array()
        .min(1, 'Must have at least one Branch Addresses')
        .required(errorMsg({ name: 'Branch Addresses', type: 'required' })),
});

export default function Entities({handleNext}) {
  const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
    mode: "all",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const companyTypes = timeZone();
  const noOfBranchesList = dateFormatList();
  const country = currencyList();
  const stateList = currencyList();
  const cityList = currencyList();
  const [openEntityModal, setOpenEntityModal] = React.useState(false);
  const [openEmployeeGradeModal, setOpenEmployeeGradeModal] = React.useState(false);
  const [openEmployeeGradeLevelModal, setOpenEmployeeGradeLevelModal] = React.useState(false);
  const [humanResource, setHumanResource] = React.useState(true);
  const [finance, setFinance] = React.useState(true);
  const [informationTechnology, setInformationTechnology] = React.useState(false);
  const [phoneNumber1, setPhoneNumber1] = React.useState(234);
  const [phoneNumber2, setPhoneNumber2] = React.useState(234);
  const [companyStartDate, setCompanyStartDate] = React.useState(new Date());
  const [branchAddresses, setBranchAddresses] = React.useState([]);
  const [branchAddressesErr, setBranchAddressesErr] = React.useState("");
  const [companyTypeErr, setCompanyTypeErr] = React.useState("");
  const [noOfBranchesErr, setNoOfBranchesErr] = React.useState("");
  const [countryErr, setCountryErr] = React.useState("");
  const [stateErr, setStateErr] = React.useState("");
  const [cityErr, setCityErr] = React.useState("");
  const classes = useStyles();


  React.useEffect(() => {
    setCompanyTypeErr(errors.companyType?.message);
    setNoOfBranchesErr(errors.noOfBranches?.message);
    setCountryErr(errors.country?.message);
    setStateErr(errors.state?.message);
    setCityErr(errors.city?.message);
    setBranchAddressesErr(errors.branchAddresses?.message);
  }, [errors]);

  React.useEffect(() => {
    register({ name: 'companyStartDate', type: 'custom' }, { required: true });
    setValue("companyStartDate", JSON.stringify(companyStartDate));
  }, [companyStartDate]);

  React.useEffect(() => {
    console.log('data: ', {...getValues()});
  }, [getValues])

  const handleHumanResourceChange = (event) => {
    setHumanResource(event.target.checked);
  };
  const handleFinanceChange = (event) => {
    setFinance(event.target.checked);
  };
  const handleInformationTechnologyChange = (event) => {
    setInformationTechnology(event.target.checked);
  };

  const handleCompanyTypeChange = (event) => {
    register({ name: 'companyType', type: 'custom' }, { required: true });
    setValue("companyType", event.target.value);
    setCompanyTypeErr(errors.companyType?.message);
  };

  const handleNoOfBranchesChange = (event) => {
    register({ name: 'noOfBranches', type: 'custom' }, { required: true });
    setValue("noOfBranches", event.target.value);
    setNoOfBranchesErr(errors.noOfBranches?.message);
  };

  const handlePhone1Change = (event) => {
    setPhoneNumber1(event);
  };
    
  const handlePhone2Change = (event) => {
    setPhoneNumber2(event);
  };

  const handleCountryChange = (event) => {
    register({ name: 'country', type: 'custom' }, { required: true });
    setValue("country", event.target.value);
    setCountryErr(errors.country?.message);
  };

  const handleStateChange = (event) => {
    register({ name: 'state', type: 'custom' }, { required: true });
    setValue("state", event.target.value);
    setStateErr(errors.state?.message);
  };
  
  const handleCityChange = (event) => {
    register({ name: 'city', type: 'custom' }, { required: true });
    setValue("city", event.target.value);
    setCityErr(errors.city?.message);
  };
  
  const handleAddBranchAddresses = (chip) => {
    register({ name: 'branchAddresses', type: 'custom' }, { required: true });
    branchAddresses.push(chip)
    setValue("branchAddresses", branchAddresses);
    setBranchAddressesErr(errors.branchAddresses?.message);
    console.log('data: ', JSON.stringify({...getValues()}));
  };

  const handleDeleteBranchAddresses = (chip, index) => {
    register({ name: 'branchAddresses', type: 'custom' }, { required: true });
    let branchAddressesData = branchAddresses;
    branchAddressesData.splice(index, 1);
    setBranchAddresses(branchAddressesData);
    setValue("branchAddresses", branchAddressesData);
    setBranchAddressesErr(errors.branchAddresses?.message);
  };

  const HandleAddEntity = () => {
    setOpenEntityModal(true);
  }

  const handleAddEmployeeGrade = () => {
    setOpenEmployeeGradeModal(true);
  }

  const HandleAddEmployeeGradeLevel = () => {
    setOpenEmployeeGradeLevelModal(true);
  }



  const onSubmit = async (data) => {
      try {
        const form = { ...data }
        loading('processing...');
        const { data: { message  } } = await api.post('/organization_info', form);
        swal.fire({
          text: message,
          icon: 'success'
        });
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
          <Typography variant="h5" color="initial" className='my-10'><strong>Entities</strong></Typography>
          <Typography variant="body1" color="initial" className='my-10'><strong>Please select departments that will be general for all entities</strong></Typography>
          <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' style={{ marginBottom: '-15px' }}>
              <FormControlLabel control={<Checkbox
                checked={humanResource}
                onChange={handleHumanResourceChange}
                name="humanResource"
                color="primary"
              />}
              label="Human Resource" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' style={{ marginBottom: '-15px', marginTop: '-15px'  }}>
              <FormControlLabel control={<Checkbox
                checked={finance}
                onChange={handleFinanceChange}
                name="finance"
                color="primary"
              />}
              label="Finance" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' style={{ marginTop: '-15px' }}>
              <FormControlLabel control={<Checkbox
                checked={informationTechnology}
                onChange={handleInformationTechnologyChange}
                name="informationTechnology"
                color="primary"
              />}
              label="Information Technology" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
              <Button onClick={HandleAddEntity} variant="contained" color="secondary">
                <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Entity
              </Button>
            </Grid>

            
            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
              <Typography variant="h5" color="initial" className='my-10'><strong>Employee Grade</strong></Typography>
              <Button onClick={handleAddEmployeeGrade} variant="contained" color="secondary">
                <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Employee Grade
              </Button>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} align='left' className='my-10'>
              <Typography variant="h5" color="initial" className='my-10'><strong>Employee Grade Level</strong></Typography>
              <Button onClick={handleAddEmployeeGradeLevel} variant="contained" color="secondary">
                <span style={{ marginRight: '5px' }}><AddBoxOutlinedIcon/></span> Add Employee Grade Level
              </Button>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Company Type</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='companyType'
                  error={errors.companyType}
                  message={errors.companyType?.message}
                  onChange={handleCompanyTypeChange}
                  label="Company Type"
                >
                  {companyTypes.map(item => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{companyTypeErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <DatePicker
                  inputVariant="outlined"
                  name='companyStartDate'
                  error={errors.companyStartDate}
                  message={errors.companyStartDate?.message}
                  label='Company Start Date'
                  className="w-full"
                  value={companyStartDate}
                  onChange={(newValue) => {
                    console.log('errors: ', errors);
                    setCompanyStartDate(newValue);
                    register({ name: 'companyStartDate', type: 'custom' }, { required: true });
                    setValue("companyStartDate", JSON.stringify(newValue));
                  }}
                  format="MM/DD/yyyy"
                  helperText={errors.companyStartDate?.message}
                />
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Number Of Branches</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='noOfBranches'
                  error={errors.noOfBranches}
                  message={errors.noOfBranches?.message}
                  onChange={handleNoOfBranchesChange}
                  label="Number Of Branches"
                >
                  {noOfBranchesList.map(item => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{noOfBranchesErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <PhoneNumberInput
                placeholder='Primary Phone Number'
                name='phoneNumber1'
                onChange={handlePhone1Change}
                error={errors.phoneNumber1}
                refs={register}
                type='number'
                message={errors.phoneNumber1?.message}
                helperText={errors.phoneNumber1?.message}
                country={'ng'}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <PhoneNumberInput
                placeholder='Secondary Phone Number'
                name='phoneNumber2'
                onChange={handlePhone2Change}
                error={errors.phoneNumber2}
                refs={register}
                type='number'
                message={errors.phoneNumber2?.message}
                helperText={errors.phoneNumber2?.message}
                country={'ng'}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                  required
                  label='Company Email'
                  name='companyEmail'
                  error={errors.companyEmail}
                  message={errors.companyEmail?.message}
                  helperText={errors.companyEmail?.message}
                  refs={register}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='country'
                  error={errors.country}
                  message={errors.country?.message}
                  onChange={handleCountryChange}
                  label="Country"
                >
                  {country.map(item => (
                  <MenuItem key={item.id} value={item.cc}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{countryErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='state'
                  error={errors.state}
                  message={errors.state?.message}
                  onChange={handleStateChange}
                  label="State"
                >
                  {stateList.map(item => (
                  <MenuItem key={item.id} value={item.cc}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{stateErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='city'
                  error={errors.city}
                  message={errors.city?.message}
                  onChange={handleCityChange}
                  label="City"
                >
                  {cityList.map(item => (
                  <MenuItem key={item.id} value={item.cc}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{cityErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={5} md={12} sm={12} xs={12}>
              <Input
                  required
                  label='Company Vision'
                  name='companyVision'
                  type='text'
                  multiline
                  rows="4"
                  error={errors.companyVision}
                  message={errors.companyVision?.message}
                  helperText={errors.companyVision?.message}
                  refs={register}
              />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Input
                  required
                  label='Company Mission'
                  name='companyMission'
                  type='text'
                  multiline
                  rows="4"
                  error={errors.companyMission}
                  message={errors.companyMission?.message}
                  helperText={errors.companyMission?.message}
                  refs={register}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={12} xs={12}>
              <Input
                  required
                  label='Company Website'
                  name='companyWebsite'
                  error={errors.companyWebsite}
                  message={errors.companyWebsite?.message}
                  helperText={errors.companyWebsite?.message}
                  refs={register}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Input
                  required
                  label='HQ Address'
                  name='hqAddress'
                  type='text'
                  multiline
                  rows="4"
                  error={errors.hqAddress}
                  message={errors.hqAddress?.message}
                  helperText={errors.hqAddress?.message}
                  refs={register}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <ChipInput
                label='Branch Addresses (Separate with Comma / Enter)'
                name='branchAddresses'
                variant= 'outlined'
                newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.branchAddresses}
                message={errors.branchAddresses?.message}
                helperText={errors.branchAddresses?.message}
                // type='text'
                // multiline
                // rows="6"
                allowDuplicates={false}
                value={branchAddresses}
                onAdd={(chip) => handleAddBranchAddresses(chip)}
                onDelete={(chip, index) => handleDeleteBranchAddresses(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{branchAddressesErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
            </Grid>  
          </Grid>
          <Grid container spacing={3} justify='center' align='center' className='my-10'>
              <Button variant="contained" type='submit' color="primary">
                  Submit 
              </Button>
          </Grid>
      </form>
      <EntityModal open={openEntityModal} setOpen={setOpenEntityModal} data={{}}/>
      <EmployeeGradeModal open={openEmployeeGradeModal} setOpen={setOpenEmployeeGradeModal} data={{}}/>
      <EmployeeGradeLevelModal open={openEmployeeGradeLevelModal} setOpen={setOpenEmployeeGradeLevelModal} data={{}}/>
    </div>
  );
}