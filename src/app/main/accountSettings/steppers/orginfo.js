import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { DatePicker, validate } from "@material-ui/pickers";
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
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from "material-ui-chip-input";
import companyTypes from "app/shared/companyTypes";
import { FormHelperText } from "@material-ui/core";
import { setStepper } from '../components/setStepper';
import SharedDropzone from './../../../shared/sharedDropZone';
import *  as RegionActions from 'app/store/actions/regions.actions'
import withReducer from "app/store/withReducer";
import regionsReducer from "app/store/reducers";
import useOrganizationInfo from "../hooks/useOrganizationInfo";
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

  const state = useSelector(state => state.regions);

  const dispatch = useDispatch();

  const {
    errors,
    register,
    handleSubmit,
    onSubmit,
    validate,
    countries,
    states,
    cities,
    companyTypeList,
    organizationInfo,
    setOrganizationInfo,
    getCitites,
    getStates,
    logo, 
    setLogo
  } = useOrganizationInfo({
    state,
    dispatch,
    handleNext
  });
  
  const classes = useStyles();


  // const onSubmit = async (data) => {
  //     const form = { ...data }
  //     let formData = new FormData();
  //     for (let i = 0; i < Object.keys(form).length; i++) {
  //       formData.append(`${Object.keys(form)[i]}`, form[Object.keys(form)[i]]);
  //     }
  //     // formdata.append("logo", fileInput.files[0], "183071008_1154499071735066_2584124674723614646_n.jpg");
  //     console.log('Form Values: ', form);
  //     console.log('FormData: ', formData);
  //     try {
  //       loading('processing...');
  //       const { data: { message  } } = await api.post('/organization_info', formData);
  //       await setStepper([], 2);
  //       const dataResponse = localStorage.getItem('login_data');
	//       const localData = JSON.parse(dataResponse);
  //       console.log('Org. localData: ', localData);
  //       localData.company.regStep = 2;
  //       localStorage.setItem('login_data', JSON.stringify(localData));
  //       swal.fire({
  //         text: message,
  //         icon: 'success'
  //       });
  //       handleNext();
  //     } catch (e) {
  //       console.log('Error Message: ', e?.message)
  //       swal.fire({
  //         text: e?.message || 'Something went wrong',
  //         icon: 'error'
  //       })
  //     }
  // };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body1" color="initial" className='my-10'><strong>Organization Information</strong></Typography>
          <Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="type-label">Company Type</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="type-label"
                  id="type"
                  name='type'
                  error={errors?.type}
                  message={errors?.type?.message}
                  value={organizationInfo?.type}
                  onChange={(ev) => {
                    setOrganizationInfo({
                      ...organizationInfo,
                      type: ev.target.value
                    });
                  }}
                  label="Company Type"
                >
                  {companyTypeList.map(item => (
                  <MenuItem key={item.number} value={item.name}>
                    {item.name}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{errors.type?.message}</FormHelperText>
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
                  value={organizationInfo?.startDate}
                  ref={register}
                  onChange={(newValue) => {
                    setOrganizationInfo({
                      ...organizationInfo,
                      startDate: newValue
                    });
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
                  value={organizationInfo?.noOfBranch}
                  refs={register}
                  onChange={(ev) => {
                    setOrganizationInfo({
                      ...organizationInfo,
                      noOfBranch: ev.target.value
                    });
                  }}
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
                onChange={(value) => {
                  setOrganizationInfo({
                    ...organizationInfo,
                    primaryPhoneNo: value
                  });
                }}
                error={errors.primaryPhoneNo}
                refs={register}
                type='number'
                value={organizationInfo?.primaryPhoneNo}
                message={errors.primaryPhoneNo?.message}
                helperText={errors.primaryPhoneNo?.message}
                country={organizationInfo.country.toLowerCase() || 'ng'}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <PhoneNumberInput
                placeholder='Secondary Phone Number'
                name='secondaryPhoneNo'
                onChange={(value) => {
                  setOrganizationInfo({
                    ...organizationInfo,
                    secondaryPhoneNo: value
                  });
                }}
                error={errors.secondaryPhoneNo}
                refs={register}
                type='number'
                value={organizationInfo?.secondaryPhoneNo}
                message={errors.secondaryPhoneNo?.message}
                helperText={errors.secondaryPhoneNo?.message}
                country={organizationInfo.country.toLowerCase() ||'ng'}
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
                  value={organizationInfo?.email}
                  refs={register}
                  onChange={(ev) => {
                    setOrganizationInfo({
                      ...organizationInfo,
                      email: ev.target.value
                    });
                  }}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="country-label"
                  id="country"
                  name='country'
                  error={errors?.country}
                  ref={register}
                  message={errors?.country?.message}
                  value={organizationInfo?.country}
                  onChange={(ev) => {
                    getStates(ev.target.value);
                    setOrganizationInfo({
                      ...organizationInfo,
                      country: ev.target.value
                    });
                  }}
                  label="Country"
                >
                  {countries && countries.map(item => (
                  <MenuItem key={item.id} value={item?.name}>
                    {item?.name}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{errors?.country?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="state-label"
                  id="state"
                  name='state'
                  error={errors?.state}
                  message={errors?.state?.message}
                  ref={register}
                  value={organizationInfo?.state}
                  onChange={(ev) => {
                    getCitites(ev.target.value);
                    setOrganizationInfo({
                      ...organizationInfo,
                      state: ev.target.value
                    });
                  }}
                  label="State"
                >
                  {states?.map(item => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{errors?.state?.message}</FormHelperText>
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
                  ref={register}
                  value={organizationInfo?.city}
                  onChange={(ev) => {
                    setOrganizationInfo({
                      ...organizationInfo,
                      city: ev.target.value
                    });
                  }}
                  label="City"
                >
                  {cities?.map(item => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{errors?.city?.error}</FormHelperText>
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
                  value={organizationInfo?.vision}
                  onChange={(ev) => {
                    setOrganizationInfo({
                      ...organizationInfo,
                      vision: ev.target.value
                    });
                  }}
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
                  value={organizationInfo?.mission}
                  refs={register}
                  onChange={(ev) => {
                    setOrganizationInfo({
                      ...organizationInfo,
                      mission: ev.target.value
                    });
                  }}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={12} xs={12}>
              <Input
                  label='Company Website'
                  name='website'
                  error={errors.website}
                  message={errors.website?.message}
                  helperText={errors.website?.message}
                  value={organizationInfo?.website}
                  refs={register}
                  onChange={(ev) => {
                    setOrganizationInfo({
                      ...organizationInfo,
                      website: ev.target.value
                    });
                  }}
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
                  value={organizationInfo?.address}
                  refs={register}
                  onChange={(ev) => {
                    setOrganizationInfo({
                      ...organizationInfo,
                      address: ev.target.value
                    });
                  }}
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
                error={errors?.branchAddress}
                message={errors?.branchAddress?.message}
                // helperText={errors.branchAddress?.message}
                allowDuplicates={false}
                value={organizationInfo.branchAddress}
                onAdd={(chip) => {
                  const items = organizationInfo.branchAddress;
                  items.push(chip);
                  setOrganizationInfo({
                    ...organizationInfo,
                    branchAddress: items
                  });
                }}
                onDelete={(chip, index) => {
                  setOrganizationInfo({
                    ...organizationInfo,
                    branchAddress: organizationInfo?.branchAddress?.filter(chp => chp !== chip)
                  });
                }}
              />
              <FormHelperText style={{ color: 'red'}}>{errors?.branchAddress?.message}</FormHelperText>
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
              <Button 
                variant="contained" 
                type='button' 
                color="primary"
                disabled={validate()}
                onClick={() => onSubmit()}
                >
                  Submit 
              </Button>
          </Grid>
      </form>
    </div>
  );
}

withReducer('regions', regionsReducer)(OrganizationInformation);
export default OrganizationInformation;