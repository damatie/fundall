import React from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SharedDropzone from 'app/shared/sharedDropZone';
import { createIdCardIssuance, updateIdCardIssuance, getIdCardIssuance } from '../store/actions';
import Typography from '@material-ui/core/Typography';
import useUserID from '../hooks/useUserID';

const { useState, useEffect, memo } = React;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  }
}));


const IdCardIssuance = () => {

  const classes = useStyles();

  const {
    employeeInfo: { info },
    onboardingForms: {
      idCardIssuance,
    }
  } = useSelector(state => state.onboardingForms);

  const dispatch = useDispatch();

  const [value, setValue] = useState({});

  const { id } = useUserID();

  useEffect(() => {
    !!id && dispatch(getIdCardIssuance(id))
  }, [id])


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
    formData.append('passport', value[0]);
    if (!!idCardIssuance) {
      dispatch(
        updateIdCardIssuance({ formData, id })
      );
      return;
    }
    dispatch(
      createIdCardIssuance({ formData, id })
    );
  }

  return (
    <section className={classes.root}>
      <Typography className='my-16' variant="h5" color="initial"><b>ID CARD ISSUANCE</b></Typography>
      <section className='flex justify-between flex-row items-center my-16'>
        {
          inputs.map((input, i) => (
            <TextField
              {...input}
              key={i}
              className='w-9/12 m-16'
              variant='outlined'
            />
          ))
        }
      </section>
      <section className='m-16 pb-12 border-dashed border-2 border-grey-300'>
        <Typography variant="subtitle1" className='my-12' color="initial">Passport</Typography>
        {
          !!idCardIssuance?.passport ? (
            <img
              src={idCardIssuance.passport}
              alt="Passport"
              className='w-3/12 mx-auto object-contain'
            />
          ) : (
            <Typography variant="subtitle1" color="initial">No Passport Yet</Typography>
          )
        }
      </section>
      <section className='m-16'>
        <Typography variant="subtitle1" className='my-12' color="initial">Upload Passport</Typography>
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

export default memo(IdCardIssuance);