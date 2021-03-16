import React from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SharedDropzone from 'app/shared/sharedDropZone';
import { createIdCardIssuance, updateIdCardIssuance } from '../store/actions';
import Typography from '@material-ui/core/Typography';


const { useState } = React;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  }
}));


const IdCardIssuance = () => {

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

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('passport', value[0])
    dispatch(
      createIdCardIssuance(formData)
    );
  }

  return (
    <section className={classes.root}>
      <Typography className='my-16' variant="h5" color="initial"><b>ID CARD ISSUANCE</b></Typography>
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
      <section className='my-16'>
        <Typography variant="subtitle1"  className='my-12' color="initial">Upload Passport</Typography>
        <SharedDropzone setValue={setValue} />
        <Button 
        className='mx-auto w-4/12 my-16' 
        variant="contained" 
        color="primary"
        onClick={handleSubmit}
        >
          Submit
        </Button>
      </section>
    </section>
  );
};

export default IdCardIssuance;