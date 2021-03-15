import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { signOnboardingForm } from '../store/actions';

const  { useState } = React;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  }
}));

const CheckForms = ({
  title,
  content,
  checkValue,
  name,
}) => {
  const classes = useStyles();

  const { employeeInfo: { info } } = useSelector(state => state.onboardingForms);

  const dispatch = useDispatch();

  const [value, setValue] = useState({});

  const inputs = [
    {
      label: 'Employee Name',
      value: 'David chinweike',
      value: `${info.firstName} ${info.lastName}`
    },
    {
      label: 'Employee Number',
      value: `${info.srgIdNumber}`,
    }
  ];

  const handleChange = (e) => {
    setValue({
      [e.target.name]: e.target.checked
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signOnboardingForm(value));
  }

  return (
    <section className={classes.root}>
      <Typography className='my-16' variant="h5" color="initial"><b>{title}</b></Typography>
      <section>
        {
          content.map((item) => (
            <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">{item}</Typography>
          ))
        }
      </section>
      <section className='flex flex-row items-center my-16'>
        {
          inputs.map((input, i) => (
            <TextField
              {...input}
              key={i}
              className='w-full m-16'
              variant='outlined'
            />
          ))
        }
      </section>
      <form onSubmit={handleSubmit}>
        <div className='w-full m-16'>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={checkValue}
                onChange={handleChange}
                name={name}
                color="primary"
                required
              />
            }
            label="Agree"
          />
        </div>
        <Button className='mx-auto w-4/12' variant="contained" color="primary" type='submit'>
          Submit
      </Button>
      </form>
    </section>
  );
};

export default CheckForms;