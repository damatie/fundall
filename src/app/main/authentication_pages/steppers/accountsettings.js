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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from "material-ui-chip-input";
import timeZone from "app/shared/timezoneList";
import { FormHelperText } from "@material-ui/core";


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
    timeZone: yup.number()
        .required(errorMsg({ name: 'TimeZone', type: 'required' })),
});


export default function AccountSettings() {
  const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
    mode: "all",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const timezones = timeZone();
  const [timeZoneErr, setTimeZoneErr] = React.useState("");
  const classes = useStyles();


  React.useEffect(() => {
    setTimeZoneErr(errors.timeZone?.message);
  }, [errors]);

  const handleTimeZoneChange = (event) => {
    register({ name: 'timeZone', type: 'custom' }, { required: true });
    setValue("timeZone", event.target.value);
    // setTimeZone(event.target.value);
    setTimeZoneErr(errors.timeZone?.message);
  };

  const onSubmit = async (data) => {
      try {
        const form = { ...data }
        loading('Creating Account...');
        const { data: { message  } } = await api.post('/companies', form);
        swal.fire({
          text: message,
          icon: 'success'
        });
      } catch (e) {
        swal.fire({
          text: catchErrorMsg(e),
          icon: 'error'
        })
      }
  };

  return (
    <Card className={classes.root}>
      <Typography variant="h6" color="initial" justify='center' align='center' className='my-20'><strong>Create Account</strong></Typography>
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
              <ChipInput
                  label='Employment Status'
                  name='employmentStatus'
                  variant= 'outlined'
                  style={{ width: '100%'}}
                  error={errors.employmentStatus}
                  message={errors.employmentStatus?.message}
                  helperText={errors.employmentStatus?.message}
                  refs={register}
                  allowDuplicates={false}
              />
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