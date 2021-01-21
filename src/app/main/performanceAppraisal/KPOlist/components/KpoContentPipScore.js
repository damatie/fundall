import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Controller } from 'react-hook-form';

const KpoContentPipScore = ({calculatePip}) => {
  const { handleSubmit, onSubmit, errors, register, control } = calculatePip;
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='compensationComponent'
          as={
            <SelectTextField
              name='compensationComponent'
              label='PIP Compansation Type'
              className='my-10'
              error={errors.compensationComponent}
              message={errors.compensationComponent?.message}
            >
              <MenuItem value={"Employee Basic Salary"}>
                Employee Basic Salary
              </MenuItem>
              <MenuItem value={"Employee Gross Salary Amount"}>
                Employee Gross Salary Amount
              </MenuItem>
            </SelectTextField>
          }
        />
        <Input
          name='amount'
          label='%PIP Awarded'
          className='my-16'
          type='number'
          error={errors.amount}
          message={errors.amount?.message}
          refs={register}
        />
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Save
        </SharedButton>
      </form>
    </Paper>
  );
};

export default KpoContentPipScore;