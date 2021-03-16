import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import SharedDropzone from 'app/shared/sharedDropZone';
import { createNhfForm, createMalariaPPA } from '../store/actions';
import { useDispatch } from 'react-redux';

const { useState } = React;

const UploadForms = ({title, data, type}) => {

  const inputs = [
    {
      label: 'Employee Name',
      value: 'David',
    },
    {
      label: 'Email',
      value: 'david@test.co',
    },
    {
      label: 'Entity',
      value: 'CBIT',
    },
    {
      label: 'Department',
      value: 'IT',
    },
    {
      label: 'Phone Number',
      value: '090454846484748',
    },
    {
      label: 'Start Date',
      value: '01-10-2012',
    },
    {
      label: 'Status',
      value: 'Uploaded',
    }
  ];

  const [value, setValue] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const formData = new FormData();
    switch(type) {
      case 'nhf':
        formData.append('nhfForm', value[0]);
        dispatch(createNhfForm(formData));
        break;
      case 'malaria':
        formData.append('malariaAttestationForm', value[0]);
        dispatch(createMalariaPPA(formData));
        break;
      default:
        return null;
    }
  };

  return (
    <section className='text-center'>
      <header>
      <Typography className='my-16' variant="h5" color="initial"><b>{title}</b></Typography>
      </header>
      {
        inputs.map(({label, value}, i) => (
          <Typography variant="subtitle1" color="initial">
            <b>{label}</b>:&nbsp;{value}
          </Typography>
        ))
      }
      <section>
      <Typography variant="body1" color="initial" className='my-16'>
        {`UPLOAD ${title}`}
      </Typography>
      <SharedDropzone setValue={setValue}/>
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

export default UploadForms;