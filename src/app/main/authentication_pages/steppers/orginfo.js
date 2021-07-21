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
import companyTypes from "app/shared/companyTypes";
import noOfBranchesList from "app/shared/noOfBranchesList";
import { FormHelperText } from "@material-ui/core";
import { setStepper } from './components/setStepper';
import SharedDropzone from './../../../shared/sharedDropZone';
import *  as RegionActions from 'app/store/actions/regions.actions'
import withReducer from "app/store/withReducer";
import regionsReducer from "app/store/reducers";
// import { getCitites } from './../../../store/actions/regions.actions';

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
    type: yup.string()
        .required(errorMsg({ name: 'Company Type', type: 'required' })),
    startDate: yup.string()
        .required(errorMsg({ name: 'Company Start Date', type: 'required' })),
    noOfBranch: yup.number(errorMsg({ name: 'Number Of Branches', type: 'number' }))
        .min(0)
        .required(errorMsg({ name: 'Number Of Branches', type: 'required' })),
    email: yup.string()
        .matches(/^[A-Za-z\d@$!%*#?&]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/, "Enter a valid Email Address")
        .required(errorMsg({ name: 'Email Address', type: 'required' }))
        .email(),
    country: yup.string()
        .required(errorMsg({ name: 'Country', type: 'required' })),
    state: yup.string()
        .required(errorMsg({ name: 'State', type: 'required' })),
    city: yup.string()
        .required(errorMsg({ name: 'City', type: 'required' })),
    vision: yup.string(errorMsg({ name: 'Company Vision', type: 'string' })),
    mission: yup.string(errorMsg({ name: 'Company Mission', type: 'string' })),
    website: yup.string(errorMsg({ name: 'Company Website', type: 'string' })),
    address: yup.string(errorMsg({ name: 'HQ Address', type: 'string' })),
    branchAddress: yup.array()
        // .min(1, 'Must have at least one Branch Address')
        // .required(errorMsg({ name: 'Branch Addresses', type: 'required' })),
});


function OrganizationInformation({handleNext}) {
  const { register, handleSubmit, formState:{ errors }, setValue, getValues } = useForm({
    mode: "onBlur",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const { countries, states, cities } = useSelector(state => state.regions);

  const dispatch = useDispatch();
  const companyTypeList = companyTypes();
  // const noOfBranches = noOfBranchesList();
  const [stateList, setStateList] = React.useState([]);
  const [cityList, setCityList] = React.useState([]);
  const [country, setCountry] = React.useState([]);
  const [countryValue, setCountryValue] = React.useState([]);
  const [primaryPhoneNo, setPrimaryPhoneNo] = React.useState(234);
  const [secondaryPhoneNo, setSecondaryPhoneNo] = React.useState(234);
  const [companyStartDate, setCompanyStartDate] = React.useState(new Date());
  const [branchAddresses, setBranchAddresses] = React.useState([]);
  const [branchAddressesErr, setBranchAddressesErr] = React.useState("");
  const [companyTypeErr, setCompanyTypeErr] = React.useState("");
  const [noOfBranchesErr, setNoOfBranchesErr] = React.useState("");
  const [countryErr, setCountryErr] = React.useState("");
  const [stateErr, setStateErr] = React.useState("");
  const [cityErr, setCityErr] = React.useState("");
  const [logo, setLogo] = React.useState({});
  const classes = useStyles();


  React.useState(() => {
    dispatch(RegionActions.getCountries());
  }, [])

  React.useEffect(() => {
    setCompanyTypeErr(errors.type?.message);
    setNoOfBranchesErr(errors.noOfBranch?.message);
    setCountryErr(errors.country?.message);
    setStateErr(errors.state?.message);
    setCityErr(errors.city?.message);
    setBranchAddressesErr(errors.branchAddress?.message);
  }, [errors]);

  React.useEffect(() => {
    register({ name: 'startDate', type: 'custom' }, { required: true });
    setValue("startDate", JSON.stringify(companyStartDate));
  }, [companyStartDate]);
  
  React.useEffect(() => {
    register({ name: 'branchAddress', type: 'custom' }, { required: true });
    setValue("branchAddress", branchAddresses);
    setBranchAddresses(branchAddresses);
  }, [branchAddresses]);

  const handleCompanyTypeChange = (event) => {
    register({ name: 'type', type: 'custom' }, { required: true });
    setValue("type", event.target.value);
    setCompanyTypeErr(errors.type?.message);
  };

  const handlePhone1Change = (event) => {
    setPrimaryPhoneNo(event);
  };
    
  const handlePhone2Change = (event) => {
    setSecondaryPhoneNo(event);
  };

  const handleCountryChange = (event) => {
    register({ name: 'country', type: 'custom' }, { required: true });
    setValue("country", event.target.value);
    dispatch(RegionActions.getStates(event.target.value));
    setCountryValue(event.target.value);
    setCountryErr(errors.country?.message);
  };

  const handleStateChange = (event) => {
    register({ name: 'state', type: 'custom' }, { required: true });
    setValue("state", event.target.value);
    dispatch(RegionActions.getCitites(event.target.value));
    setStateErr(errors.state?.message);
  };
  
  const handleCityChange = (event) => {
    register({ name: 'city', type: 'custom' }, { required: true });
    setValue("city", event.target.value);
    setCityErr(errors.city?.message);
  };
  
  const handleAddBranchAddresses = (chip) => {
    register({ name: 'branchAddress', type: 'custom' }, { required: true });
    branchAddresses.push(chip)
    console.log('branchAddresses: ', branchAddresses);
    setValue("branchAddress", branchAddresses);
    setBranchAddressesErr(errors.branchAddress?.message);
  };

  const handleDeleteBranchAddresses = (chip, index) => {
    register({ name: 'branchAddress', type: 'custom' }, { required: true });
    setBranchAddresses((branchAddresses) => branchAddresses.filter((chp) => chp !== chip));
    setValue("branchAddress", branchAddresses);
    setBranchAddressesErr(errors.branchAddress?.message);
  };

  const onSubmit = async (data) => {
      const form = { ...data }
      let formData = new FormData();
      for (let i = 0; i < Object.keys(form).length; i++) {
        formData.append(`${Object.keys(form)[i]}`, form[Object.keys(form)[i]]);
      }
      // formdata.append("logo", fileInput.files[0], "183071008_1154499071735066_2584124674723614646_n.jpg");
      console.log('Form Values: ', form);
      console.log('FormData: ', formData);
      try {
        loading('processing...');
        const { data: { message  } } = await api.post('/organization_info', formData);
        await setStepper([], 2);
        const dataResponse = localStorage.getItem('login_data');
	      const localData = JSON.parse(dataResponse);
        console.log('Org. localData: ', localData);
        localData.company.regStep = 2;
        localStorage.setItem('login_data', JSON.stringify(localData));
        swal.fire({
          text: message,
          icon: 'success'
        });
        handleNext();
      } catch (e) {
        console.log('Error Message: ', e?.message)
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
                  name='type'
                  error={errors.type}
                  message={errors.type?.message}
                  onChange={handleCompanyTypeChange}
                  label="Company Type"
                >
                  {companyTypeList.map(item => (
                  <MenuItem key={item.number} value={item.name}>
                    {item.name}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{companyTypeErr}</FormHelperText>
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
                  label='Company Start Date'
                  className="w-full"
                  value={companyStartDate}
                  onChange={(newValue) => {
                    setCompanyStartDate(newValue);
                    register({ name: 'startDate', type: 'custom' }, { required: true });
                    setValue("startDate", JSON.stringify(newValue));
                  }}
                  format="MM/DD/yyyy"
                  helperText={errors.startDate?.message}
                />
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                  required
                  label='Number Of Branches'
                  name='noOfBranch'
                  type="number"
                  allowNegative={false}
                  inputProps={{ min: 0 }}
                  min={0}
                  error={errors.noOfBranch}
                  message={errors.noOfBranch?.message}
                  helperText={errors.noOfBranch?.message}
                  refs={register}
              />  
              {/* <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Number Of Branches</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='noOfBranch'
                  error={errors.noOfBranch}
                  message={errors.noOfBranch?.message}
                  onChange={handleNoOfBranchesChange}
                  label="Number Of Branches"
                >
                  {noOfBranchesList.map(item => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{noOfBranchesErr}</FormHelperText>
              </FormControl> */}
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <PhoneNumberInput
                placeholder='Primary Phone Number'
                name='primaryPhoneNo'
                onChange={handlePhone1Change}
                error={errors.primaryPhoneNo}
                refs={register}
                type='number'
                message={errors.primaryPhoneNo?.message}
                helperText={errors.primaryPhoneNo?.message}
                country={'ng'}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <PhoneNumberInput
                placeholder='Secondary Phone Number'
                name='secondaryPhoneNo'
                onChange={handlePhone2Change}
                error={errors.secondaryPhoneNo}
                refs={register}
                type='number'
                message={errors.secondaryPhoneNo?.message}
                helperText={errors.secondaryPhoneNo?.message}
                country={'ng'}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Input
                  required
                  label='Company Email'
                  name='email'
                  error={errors.email}
                  message={errors.email?.message}
                  helperText={errors.email?.message}
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
                  {countries && countries.map(item => (
                  <MenuItem key={item.id} value={item?.name}>
                    {item?.name}
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
                  {states && states.map(item => (
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
                  {cities && cities.map(item => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{cityErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={5} md={12} sm={12} xs={12}>
              <Input
                  // required
                  label='Company Vision'
                  name='vision'
                  type='text'
                  multiline
                  rows="6"
                  error={errors.vision}
                  message={errors.vision?.message}
                  helperText={errors.vision?.message}
                  refs={register}
              />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Input
                  // required
                  label='Company Mission'
                  name='mission'
                  type='text'
                  multiline
                  rows="6"
                  error={errors.mission}
                  message={errors.mission?.message}
                  helperText={errors.mission?.message}
                  refs={register}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={12} xs={12}>
              <Input
                  label='Company Website'
                  name='website'
                  error={errors.website}
                  message={errors.website?.message}
                  helperText={errors.website?.message}
                  refs={register}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Input
                  required
                  label='HQ Address'
                  name='address'
                  type='text'
                  multiline
                  rows="6"
                  error={errors.address}
                  message={errors.address?.message}
                  helperText={errors.address?.message}
                  refs={register}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <ChipInput
                label='Branch Addresses (Separate with Enter)'
                name='branchAddresses'
                variant= 'outlined'
                placeholder= 'Enter Branch Addresses Here'
                // newChipKeyCodes={[188]}
                style={{ width: '100%'}}
                error={errors.branchAddress}
                message={errors.branchAddress?.message}
                // helperText={errors.branchAddress?.message}
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
                {/* <span style={{ marginBottom: '0.5rem', display: 'inline-block' }} ><strong>Company Logo</strong></span> */}
                <SharedDropzone allowedTypes={'image/*'} placeholder={"Upload Company Logo"} setValue={setLogo} />
              </div>
            </Grid>  
          </Grid>
          <Grid container spacing={3} justify='center' align='center' className='my-10'>
              <Button variant="contained" type='submit' color="primary">
                  Submit 
              </Button>
          </Grid>
      </form>
    </div>
  );
}

withReducer('regions', regionsReducer)(OrganizationInformation);
export default OrganizationInformation;