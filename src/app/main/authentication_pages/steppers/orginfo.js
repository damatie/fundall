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
import Card from '@material-ui/core/Card';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import { makeStyles } from '@material-ui/core/styles';
import catchErrorMsg from 'utils/catchErrorMsg';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
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
import SharedDropzone from './../../../shared/sharedDropZone';
import *  as RegionActions from 'app/store/actions/regions.actions'
import withReducer from "app/store/withReducer";
import regionsReducer from "app/store/reducers";

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


function OrganizationInformation({handleNext}) {
  const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
    mode: "all",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const { countries, states, cities } = useSelector(state => state.regions);

  const dispatch = useDispatch();
  const companyTypes = timeZone();
  const noOfBranchesList = dateFormatList();
  const [stateList, setStateList] = React.useState([]);
  const [cityList, setCityList] = React.useState([]);
  const [country, setCountry] = React.useState([]);
  const [countryValue, setCountryValue] = React.useState([]);
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
  const [companyLogo, setCompanyLogo] = React.useState({});
  const classes = useStyles();


  React.useState(() => {
    dispatch(RegionActions.getCountries());
    console.log('countries: ', countries)
  }, [])

  React.useState(() => {
    dispatch(RegionActions.getStates(countryValue));
  }, [countryValue])

  React.useState(() => {
    setCountry(countries);
  }, [countries])

  React.useState(() => {
    setStateList(states);
  }, [states])

  React.useState(() => {
    setCityList(cities);
  }, [cities])

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
    setCountryValue(event.target.value);
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

  const onSubmit = async (data) => {
      try {
        const form = { ...data }
        loading('processing...');
        const { data: { message  } } = await api.post('/organization_info', form);
        swal.fire({
          text: message,
          icon: 'success'
        });
        setStepper([], 2);
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
          <Typography variant="body1" color="initial" className='my-10'><strong>Organization Information</strong></Typography>
          <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
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
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
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
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
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
                  rows="6"
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
                  rows="6"
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
                  rows="6"
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
                allowDuplicates={false}
                value={branchAddresses}
                onAdd={(chip) => handleAddBranchAddresses(chip)}
                onDelete={(chip, index) => handleDeleteBranchAddresses(chip, index)}
              />
              <FormHelperText style={{ color: 'red'}}>{branchAddressesErr}</FormHelperText>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
            </Grid>  
            <Grid item lg={12} md={12} sm={12} xs={12} alignItems="center">
              <div>
                <span style={{ marginBottom: '0.5rem', display: 'inline-block' }} ><strong>Company Logo</strong></span>
                <SharedDropzone allowedTypes={'image/*'} placeholder={"Upload Company Logo"} setValue={setCompanyLogo} />
              </div>
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

withReducer('regions', regionsReducer)(OrganizationInformation);
export default OrganizationInformation;